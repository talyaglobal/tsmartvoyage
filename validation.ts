import { z } from 'zod';
import { UserRole, PackageType, CharterStatus } from '@/types';

// User validation schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  role: z.nativeEnum(UserRole).optional().default(UserRole.USER)
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required')
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  role: z.nativeEnum(UserRole).optional(),
  isActive: z.boolean().optional()
});

// Yacht validation schemas
export const createYachtSchema = z.object({
  name: z.string().min(1, 'Yacht name is required').max(100),
  type: z.string().min(1, 'Yacht type is required'),
  capacity: z.number().int().min(1, 'Capacity must be at least 1').max(50),
  length: z.number().positive('Length must be positive'),
  year: z.number().int().min(1900).max(new Date().getFullYear() + 1),
  pricePerDay: z.number().positive('Price must be positive'),
  currency: z.enum(['USD', 'AED', 'EUR']).default('USD'),
  features: z.array(z.string()).default([]),
  images: z.array(z.string().url()).default([]),
  location: z.string().min(1, 'Location is required')
});

export const updateYachtSchema = createYachtSchema.partial().extend({
  isAvailable: z.boolean().optional()
});

// Customer validation schemas
export const createCustomerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  nationality: z.string().optional(),
  dateOfBirth: z.string().datetime().optional(),
  emergencyContact: z.object({
    name: z.string().min(1, 'Emergency contact name is required'),
    phone: z.string().min(10, 'Emergency contact phone is required'),
    relationship: z.string().min(1, 'Relationship is required')
  }).optional()
});

export const updateCustomerSchema = createCustomerSchema.partial();

// Charter validation schemas
export const createCharterSchema = z.object({
  yachtId: z.string().uuid('Invalid yacht ID'),
  customerId: z.string().uuid('Invalid customer ID'),
  startDate: z.string().datetime('Invalid start date'),
  endDate: z.string().datetime('Invalid end date'),
  packageType: z.nativeEnum(PackageType),
  guestCount: z.number().int().min(1, 'Guest count must be at least 1').max(50),
  specialRequests: z.string().max(1000).optional()
}).refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  {
    message: 'End date must be after start date',
    path: ['endDate']
  }
);

export const updateCharterSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  status: z.nativeEnum(CharterStatus).optional(),
  packageType: z.nativeEnum(PackageType).optional(),
  guestCount: z.number().int().min(1).max(50).optional(),
  specialRequests: z.string().max(1000).optional()
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.endDate) > new Date(data.startDate);
    }
    return true;
  },
  {
    message: 'End date must be after start date',
    path: ['endDate']
  }
);

// Query parameter schemas
export const paginationSchema = z.object({
  page: z.string().transform(val => parseInt(val, 10)).pipe(z.number().int().min(1)).default('1'),
  limit: z.string().transform(val => parseInt(val, 10)).pipe(z.number().int().min(1).max(100)).default('10'),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const charterQuerySchema = paginationSchema.extend({
  status: z.nativeEnum(CharterStatus).optional(),
  customerId: z.string().uuid().optional(),
  yachtId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional()
});

export const yachtQuerySchema = paginationSchema.extend({
  isAvailable: z.string().transform(val => val === 'true').optional(),
  minCapacity: z.string().transform(val => parseInt(val, 10)).pipe(z.number().int().min(1)).optional(),
  maxCapacity: z.string().transform(val => parseInt(val, 10)).pipe(z.number().int().min(1)).optional(),
  location: z.string().optional()
});

// Generic validation helpers
export const uuidSchema = z.string().uuid('Invalid UUID format');

export const validateRequest = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code
    }));
    throw new ValidationError('Validation failed', errors);
  }
  return result.data;
};

export class ValidationError extends Error {
  public errors: Array<{ field: string; message: string; code: string }>;

  constructor(message: string, errors: Array<{ field: string; message: string; code: string }>) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

