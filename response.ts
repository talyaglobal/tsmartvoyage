// Response utilities and standardized API responses
// Following TSmart standards for consistent API responses

import { ApiResponse, PaginationMeta, ResponseMeta } from '@/types';
import { NextResponse } from 'next/server';
import { logger } from './logger';
import { v4 as uuidv4 } from 'uuid';

export class ResponseService {
  private static generateMeta(): ResponseMeta {
    return {
      timestamp: new Date().toISOString(),
      version: process.env.API_VERSION || 'v1',
      requestId: uuidv4(),
    };
  }

  static success<T>(
    data: T,
    message?: string,
    pagination?: PaginationMeta,
    status: number = 200
  ): NextResponse<ApiResponse<T>> {
    const response: ApiResponse<T> = {
      success: true,
      data,
      message,
      pagination,
      meta: this.generateMeta(),
    };

    logger.info('API Success Response', { status, hasData: !!data });
    
    return NextResponse.json(response, { status });
  }

  static error(
    message: string,
    code: string = 'INTERNAL_ERROR',
    details?: Record<string, any>,
    status: number = 500
  ): NextResponse<ApiResponse> {
    const response: ApiResponse = {
      success: false,
      message,
      error: {
        code,
        message,
        details,
      },
      meta: this.generateMeta(),
    };

    logger.error('API Error Response', { status, code, message, details });
    
    return NextResponse.json(response, { status });
  }

  static validationError(
    errors: Array<{ field: string; message: string; code: string }>,
    message: string = 'Validation failed'
  ): NextResponse<ApiResponse> {
    return this.error(message, 'VALIDATION_ERROR', { errors }, 400);
  }

  static notFound(
    resource: string = 'Resource',
    id?: string
  ): NextResponse<ApiResponse> {
    const message = id 
      ? `${resource} with ID ${id} not found`
      : `${resource} not found`;
    
    return this.error(message, 'NOT_FOUND', { resource, id }, 404);
  }

  static unauthorized(
    message: string = 'Authentication required'
  ): NextResponse<ApiResponse> {
    return this.error(message, 'UNAUTHORIZED', {}, 401);
  }

  static forbidden(
    message: string = 'Insufficient permissions'
  ): NextResponse<ApiResponse> {
    return this.error(message, 'FORBIDDEN', {}, 403);
  }

  static conflict(
    message: string,
    details?: Record<string, any>
  ): NextResponse<ApiResponse> {
    return this.error(message, 'CONFLICT', details, 409);
  }

  static tooManyRequests(
    message: string = 'Too many requests'
  ): NextResponse<ApiResponse> {
    return this.error(message, 'RATE_LIMIT_EXCEEDED', {}, 429);
  }

  static created<T>(
    data: T,
    message?: string
  ): NextResponse<ApiResponse<T>> {
    return this.success(data, message || 'Resource created successfully', undefined, 201);
  }

  static updated<T>(
    data: T,
    message?: string
  ): NextResponse<ApiResponse<T>> {
    return this.success(data, message || 'Resource updated successfully');
  }

  static deleted(
    message?: string
  ): NextResponse<ApiResponse> {
    return this.success(null, message || 'Resource deleted successfully');
  }

  static noContent(): NextResponse {
    return new NextResponse(null, { status: 204 });
  }
}

// Pagination utility
export function createPagination(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

// Query parameter parsing utilities
export function parseQueryParams(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '10', 10)));
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';
  const search = searchParams.get('search') || '';

  return {
    page,
    limit,
    offset: (page - 1) * limit,
    sortBy,
    sortOrder,
    search,
  };
}

// Filter parsing utility
export function parseFilters(searchParams: URLSearchParams, allowedFilters: string[]) {
  const filters: Record<string, any> = {};

  allowedFilters.forEach(filter => {
    const value = searchParams.get(filter);
    if (value !== null) {
      // Handle boolean values
      if (value === 'true' || value === 'false') {
        filters[filter] = value === 'true';
      }
      // Handle numeric values
      else if (!isNaN(Number(value))) {
        filters[filter] = Number(value);
      }
      // Handle string values
      else {
        filters[filter] = value;
      }
    }
  });

  return filters;
}

// Error handling utility
export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  if (error instanceof Error) {
    logger.error('API Error', { message: error.message, stack: error.stack });
    
    // Handle specific error types
    if (error.message.includes('validation')) {
      return ResponseService.validationError([], error.message);
    }
    
    if (error.message.includes('not found')) {
      return ResponseService.notFound();
    }
    
    if (error.message.includes('unauthorized')) {
      return ResponseService.unauthorized();
    }
    
    if (error.message.includes('forbidden')) {
      return ResponseService.forbidden();
    }
  }

  logger.error('Unknown API Error', { error });
  return ResponseService.error('Internal server error');
}

export default ResponseService;

