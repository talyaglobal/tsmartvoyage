// Authentication service following TSmart standards
// JWT-based authentication with role-based access control

import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { User, JWTPayload, AuthResponse, LoginRequest, RegisterRequest } from '@/types';
import { getJWTConfig } from '@/config';
import { db } from './database';
import { logger } from './logger';
import { v4 as uuidv4 } from 'uuid';

export class AuthService {
  private jwtSecret: Uint8Array;
  private jwtConfig: ReturnType<typeof getJWTConfig>;

  constructor() {
    this.jwtConfig = getJWTConfig();
    this.jwtSecret = new TextEncoder().encode(this.jwtConfig.secret);
  }

  // User registration
  async register(data: RegisterRequest): Promise<AuthResponse | { error: string }> {
    try {
      // Check if user already exists
      const existingUser = await db.findMany<User>('users', {
        where: { email: data.email },
        limit: 1,
      });

      if (existingUser.data.length > 0) {
        return { error: 'User with this email already exists' };
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12);

      // Create user
      const userData = {
        id: uuidv4(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: hashedPassword,
        role: 'CUSTOMER' as const,
        isActive: true,
        phone: data.phone,
      };

      const userResult = await db.create<User>('users', userData);

      if (userResult.error) {
        logger.error('User creation failed', { error: userResult.error });
        return { error: 'Failed to create user account' };
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = userResult.data as any;

      // Generate tokens
      const token = await this.generateToken(userWithoutPassword);
      const refreshToken = await this.generateRefreshToken(userWithoutPassword);

      // Update last login
      await db.update('users', userWithoutPassword.id, {
        lastLoginAt: new Date().toISOString(),
      });

      return {
        user: userWithoutPassword,
        token,
        refreshToken,
        expiresAt: this.getTokenExpiration(),
      };
    } catch (error) {
      logger.error('Registration error', { error });
      return { error: 'Registration failed' };
    }
  }

  // User login
  async login(data: LoginRequest): Promise<AuthResponse | { error: string }> {
    try {
      // Find user by email
      const userResult = await db.findMany<User & { password: string }>('users', {
        where: { email: data.email, isActive: true },
        limit: 1,
      });

      if (userResult.data.length === 0) {
        return { error: 'Invalid email or password' };
      }

      const user = userResult.data[0];

      // Verify password
      const isValidPassword = await bcrypt.compare(data.password, user.password);
      if (!isValidPassword) {
        return { error: 'Invalid email or password' };
      }

      // Remove password from response
      const { password, ...userWithoutPassword } = user;

      // Generate tokens
      const token = await this.generateToken(userWithoutPassword);
      const refreshToken = await this.generateRefreshToken(userWithoutPassword);

      // Update last login
      await db.update('users', user.id, {
        lastLoginAt: new Date().toISOString(),
      });

      return {
        user: userWithoutPassword,
        token,
        refreshToken,
        expiresAt: this.getTokenExpiration(),
      };
    } catch (error) {
      logger.error('Login error', { error });
      return { error: 'Login failed' };
    }
  }

  // Generate JWT token
  async generateToken(user: User): Promise<string> {
    const payload: JWTPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + this.parseExpiration(this.jwtConfig.expiresIn),
    };

    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(this.jwtConfig.expiresIn)
      .sign(this.jwtSecret);
  }

  // Generate refresh token
  async generateRefreshToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      type: 'refresh',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + this.parseExpiration(this.jwtConfig.refreshExpiresIn),
    };

    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(this.jwtConfig.refreshExpiresIn)
      .sign(this.jwtSecret);
  }

  // Verify JWT token
  async verifyToken(token: string): Promise<JWTPayload | null> {
    try {
      const { payload } = await jwtVerify(token, this.jwtSecret);
      return payload as JWTPayload;
    } catch (error) {
      logger.warn('Token verification failed', { error: error.message });
      return null;
    }
  }

  // Refresh access token
  async refreshToken(refreshToken: string): Promise<AuthResponse | { error: string }> {
    try {
      const payload = await jwtVerify(refreshToken, this.jwtSecret);
      
      if (payload.payload.type !== 'refresh') {
        return { error: 'Invalid refresh token' };
      }

      // Get user data
      const userResult = await db.findUnique<User>('users', payload.payload.sub as string);
      
      if (userResult.error || !userResult.data || !userResult.data.isActive) {
        return { error: 'User not found or inactive' };
      }

      const user = userResult.data;

      // Generate new tokens
      const newToken = await this.generateToken(user);
      const newRefreshToken = await this.generateRefreshToken(user);

      return {
        user,
        token: newToken,
        refreshToken: newRefreshToken,
        expiresAt: this.getTokenExpiration(),
      };
    } catch (error) {
      logger.error('Token refresh error', { error });
      return { error: 'Token refresh failed' };
    }
  }

  // Get user by token
  async getUserByToken(token: string): Promise<User | null> {
    try {
      const payload = await this.verifyToken(token);
      if (!payload) return null;

      const userResult = await db.findUnique<User>('users', payload.sub);
      return userResult.data;
    } catch (error) {
      logger.error('Get user by token error', { error });
      return null;
    }
  }

  // Change password
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      // Get user with password
      const userResult = await db.findMany<User & { password: string }>('users', {
        where: { id: userId },
        limit: 1,
      });

      if (userResult.data.length === 0) {
        return { success: false, error: 'User not found' };
      }

      const user = userResult.data[0];

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isValidPassword) {
        return { success: false, error: 'Current password is incorrect' };
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      const updateResult = await db.update('users', userId, {
        password: hashedNewPassword,
      });

      if (updateResult.error) {
        return { success: false, error: 'Failed to update password' };
      }

      return { success: true };
    } catch (error) {
      logger.error('Change password error', { error });
      return { success: false, error: 'Password change failed' };
    }
  }

  // Reset password (would typically involve email verification)
  async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if user exists
      const userResult = await db.findMany<User>('users', {
        where: { email, isActive: true },
        limit: 1,
      });

      if (userResult.data.length === 0) {
        // Don't reveal if email exists for security
        return { success: true };
      }

      // In a real implementation, you would:
      // 1. Generate a secure reset token
      // 2. Store it in the database with expiration
      // 3. Send email with reset link
      
      logger.info('Password reset requested', { email });
      return { success: true };
    } catch (error) {
      logger.error('Password reset error', { error });
      return { success: false, error: 'Password reset failed' };
    }
  }

  // Utility methods
  private parseExpiration(expiration: string): number {
    const unit = expiration.slice(-1);
    const value = parseInt(expiration.slice(0, -1), 10);

    switch (unit) {
      case 's': return value;
      case 'm': return value * 60;
      case 'h': return value * 60 * 60;
      case 'd': return value * 24 * 60 * 60;
      default: return 3600; // 1 hour default
    }
  }

  private getTokenExpiration(): string {
    const expirationSeconds = this.parseExpiration(this.jwtConfig.expiresIn);
    return new Date(Date.now() + expirationSeconds * 1000).toISOString();
  }
}

// Singleton instance
export const authService = new AuthService();

// Role-based access control helpers
export function hasRole(user: User, requiredRole: User['role']): boolean {
  const roleHierarchy = {
    CUSTOMER: 0,
    MANAGER: 1,
    ADMIN: 2,
  };

  return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
}

export function requireRole(requiredRole: User['role']) {
  return (user: User): boolean => hasRole(user, requiredRole);
}

export default authService;

