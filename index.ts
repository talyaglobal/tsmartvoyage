import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/lib/auth';
import { ResponseService, LoggerService } from '@/lib/response';
import { UserRole, RequestContext } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const authService = AuthService.getInstance();
const logger = LoggerService.getInstance();

// Authentication middleware
export function withAuth(requiredRole: UserRole = UserRole.USER) {
  return function (handler: (req: NextRequest, context: RequestContext) => Promise<NextResponse>) {
    return async function (req: NextRequest): Promise<NextResponse> {
      try {
        const authHeader = req.headers.get('authorization');
        const token = authService.extractTokenFromHeader(authHeader);

        if (!token) {
          return NextResponse.json(
            ResponseService.unauthorized('Authentication token required'),
            { status: 401 }
          );
        }

        const payload = await authService.verifyToken(token);

        if (!authService.hasPermission(payload.role, requiredRole)) {
          return NextResponse.json(
            ResponseService.forbidden('Insufficient permissions'),
            { status: 403 }
          );
        }

        const context: RequestContext = {
          userId: payload.userId,
          userRole: payload.role,
          requestId: uuidv4(),
          timestamp: new Date(),
          userAgent: req.headers.get('user-agent') || undefined,
          ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || undefined
        };

        return handler(req, context);
      } catch (error) {
        logger.error('Authentication middleware error', { error });
        return NextResponse.json(
          ResponseService.unauthorized('Invalid authentication token'),
          { status: 401 }
        );
      }
    };
  };
}

// Rate limiting middleware
export function withRateLimit(windowMs: number = 900000, maxRequests: number = 100) {
  const requests = new Map<string, { count: number; resetTime: number }>();

  return function (handler: (req: NextRequest) => Promise<NextResponse>) {
    return async function (req: NextRequest): Promise<NextResponse> {
      const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
      const now = Date.now();
      const windowStart = now - windowMs;

      // Clean up old entries
      for (const [key, value] of requests.entries()) {
        if (value.resetTime < now) {
          requests.delete(key);
        }
      }

      const current = requests.get(ip) || { count: 0, resetTime: now + windowMs };

      if (current.resetTime < now) {
        current.count = 1;
        current.resetTime = now + windowMs;
      } else {
        current.count++;
      }

      requests.set(ip, current);

      if (current.count > maxRequests) {
        return NextResponse.json(
          ResponseService.error('Rate limit exceeded', 'Too many requests'),
          { 
            status: 429,
            headers: {
              'X-RateLimit-Limit': maxRequests.toString(),
              'X-RateLimit-Remaining': '0',
              'X-RateLimit-Reset': Math.ceil(current.resetTime / 1000).toString()
            }
          }
        );
      }

      const response = await handler(req);
      
      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', maxRequests.toString());
      response.headers.set('X-RateLimit-Remaining', (maxRequests - current.count).toString());
      response.headers.set('X-RateLimit-Reset', Math.ceil(current.resetTime / 1000).toString());

      return response;
    };
  };
}

// Request logging middleware
export function withLogging() {
  return function (handler: (req: NextRequest) => Promise<NextResponse>) {
    return async function (req: NextRequest): Promise<NextResponse> {
      const startTime = Date.now();
      const requestId = uuidv4();

      // Add request ID to headers for tracing
      const response = await handler(req);
      
      const duration = Date.now() - startTime;
      const statusCode = response.status;

      logger.request(
        req.method,
        req.url,
        statusCode,
        duration
      );

      response.headers.set('X-Request-ID', requestId);
      return response;
    };
  };
}

// CORS middleware
export function withCors(origins: string[] = ['*']) {
  return function (handler: (req: NextRequest) => Promise<NextResponse>) {
    return async function (req: NextRequest): Promise<NextResponse> {
      // Handle preflight requests
      if (req.method === 'OPTIONS') {
        return new NextResponse(null, {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': origins.includes('*') ? '*' : origins.join(','),
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
            'Access-Control-Max-Age': '86400'
          }
        });
      }

      const response = await handler(req);

      // Add CORS headers to response
      response.headers.set('Access-Control-Allow-Origin', origins.includes('*') ? '*' : origins.join(','));
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

      return response;
    };
  };
}

// Validation middleware
export function withValidation<T>(schema: any) {
  return function (handler: (req: NextRequest, data: T) => Promise<NextResponse>) {
    return async function (req: NextRequest): Promise<NextResponse> {
      try {
        let data: any;

        if (req.method === 'GET') {
          // Parse query parameters
          const url = new URL(req.url);
          data = Object.fromEntries(url.searchParams.entries());
        } else {
          // Parse request body
          data = await req.json();
        }

        const validatedData = schema.parse(data);
        return handler(req, validatedData);
      } catch (error) {
        logger.error('Validation middleware error', { error });
        
        if (error instanceof Error && 'errors' in error) {
          return NextResponse.json(
            ResponseService.validationError(error.errors as any),
            { status: 400 }
          );
        }

        return NextResponse.json(
          ResponseService.badRequest('Invalid request data'),
          { status: 400 }
        );
      }
    };
  };
}

// Compose multiple middlewares
export function compose(...middlewares: Array<(handler: any) => any>) {
  return function (handler: any) {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
  };
}

