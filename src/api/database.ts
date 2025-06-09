// Database Abstraction Layer (DAL) for TSmart Voyage API
// Following TSmart standards: Supabase preferred with REST API (no SDK)
// Provides unified interface for all database operations

import { DatabaseConfig, DatabaseResponse, QueryOptions } from '@/types';
import { getSupabaseConfig } from '@/config';
import { logger } from './logger';

export class DatabaseService {
  private config: DatabaseConfig;
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    const supabaseConfig = getSupabaseConfig();
    this.config = {
      type: 'supabase',
      url: supabaseConfig.url,
      apiKey: supabaseConfig.anonKey,
      serviceRoleKey: supabaseConfig.serviceRoleKey,
    };

    this.baseUrl = `${this.config.url}/rest/v1`;
    this.headers = {
      'Content-Type': 'application/json',
      'apikey': this.config.apiKey!,
      'Authorization': `Bearer ${this.config.serviceRoleKey}`,
      'Prefer': 'return=representation',
    };
  }

  // Generic CRUD operations following TSmart standards
  async findMany<T>(
    table: string,
    options: QueryOptions = {}
  ): Promise<DatabaseResponse<T[]>> {
    try {
      const url = new URL(`${this.baseUrl}/${table}`);
      
      // Apply select fields
      if (options.select && options.select.length > 0) {
        url.searchParams.set('select', options.select.join(','));
      }

      // Apply filters
      if (options.where) {
        Object.entries(options.where).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.set(key, `eq.${value}`);
          }
        });
      }

      // Apply ordering
      if (options.orderBy) {
        Object.entries(options.orderBy).forEach(([key, direction]) => {
          url.searchParams.set('order', `${key}.${direction}`);
        });
      }

      // Apply pagination
      if (options.limit) {
        url.searchParams.set('limit', options.limit.toString());
      }
      if (options.offset) {
        url.searchParams.set('offset', options.offset.toString());
      }

      // Apply includes (foreign key expansion)
      if (options.include && options.include.length > 0) {
        const selectWithIncludes = options.select || ['*'];
        options.include.forEach(include => {
          selectWithIncludes.push(`${include}(*)`);
        });
        url.searchParams.set('select', selectWithIncludes.join(','));
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        const error = await response.text();
        logger.error('Database query failed', { table, error, status: response.status });
        return { data: [], error: `Query failed: ${error}` };
      }

      const data = await response.json();
      const count = response.headers.get('Content-Range')?.split('/')[1];

      return {
        data,
        count: count ? parseInt(count, 10) : data.length,
      };
    } catch (error) {
      logger.error('Database connection error', { table, error });
      return { data: [], error: 'Database connection failed' };
    }
  }

  async findUnique<T>(
    table: string,
    id: string,
    options: QueryOptions = {}
  ): Promise<DatabaseResponse<T | null>> {
    try {
      const url = new URL(`${this.baseUrl}/${table}`);
      url.searchParams.set('id', `eq.${id}`);
      url.searchParams.set('limit', '1');

      if (options.select && options.select.length > 0) {
        url.searchParams.set('select', options.select.join(','));
      }

      if (options.include && options.include.length > 0) {
        const selectWithIncludes = options.select || ['*'];
        options.include.forEach(include => {
          selectWithIncludes.push(`${include}(*)`);
        });
        url.searchParams.set('select', selectWithIncludes.join(','));
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        const error = await response.text();
        logger.error('Database findUnique failed', { table, id, error });
        return { data: null, error: `Query failed: ${error}` };
      }

      const data = await response.json();
      return { data: data[0] || null };
    } catch (error) {
      logger.error('Database findUnique error', { table, id, error });
      return { data: null, error: 'Database query failed' };
    }
  }

  async create<T>(
    table: string,
    data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<DatabaseResponse<T>> {
    try {
      const createData = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch(`${this.baseUrl}/${table}`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(createData),
      });

      if (!response.ok) {
        const error = await response.text();
        logger.error('Database create failed', { table, error, data: createData });
        return { data: null as any, error: `Create failed: ${error}` };
      }

      const result = await response.json();
      return { data: result[0] };
    } catch (error) {
      logger.error('Database create error', { table, error });
      return { data: null as any, error: 'Database create failed' };
    }
  }

  async update<T>(
    table: string,
    id: string,
    data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<DatabaseResponse<T>> {
    try {
      const updateData = {
        ...data,
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch(`${this.baseUrl}/${table}?id=eq.${id}`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const error = await response.text();
        logger.error('Database update failed', { table, id, error });
        return { data: null as any, error: `Update failed: ${error}` };
      }

      const result = await response.json();
      return { data: result[0] };
    } catch (error) {
      logger.error('Database update error', { table, id, error });
      return { data: null as any, error: 'Database update failed' };
    }
  }

  async delete(table: string, id: string): Promise<DatabaseResponse<boolean>> {
    try {
      const response = await fetch(`${this.baseUrl}/${table}?id=eq.${id}`, {
        method: 'DELETE',
        headers: this.headers,
      });

      if (!response.ok) {
        const error = await response.text();
        logger.error('Database delete failed', { table, id, error });
        return { data: false, error: `Delete failed: ${error}` };
      }

      return { data: true };
    } catch (error) {
      logger.error('Database delete error', { table, id, error });
      return { data: false, error: 'Database delete failed' };
    }
  }

  // Advanced query methods
  async count(table: string, where?: Record<string, any>): Promise<number> {
    try {
      const url = new URL(`${this.baseUrl}/${table}`);
      url.searchParams.set('select', 'count');

      if (where) {
        Object.entries(where).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.set(key, `eq.${value}`);
          }
        });
      }

      const response = await fetch(url.toString(), {
        method: 'HEAD',
        headers: this.headers,
      });

      const contentRange = response.headers.get('Content-Range');
      if (contentRange) {
        const count = contentRange.split('/')[1];
        return parseInt(count, 10) || 0;
      }

      return 0;
    } catch (error) {
      logger.error('Database count error', { table, error });
      return 0;
    }
  }

  async exists(table: string, where: Record<string, any>): Promise<boolean> {
    const count = await this.count(table, where);
    return count > 0;
  }

  // Raw query execution for complex operations
  async executeRaw(query: string, params?: any[]): Promise<DatabaseResponse<any>> {
    try {
      // For Supabase, we can use the RPC endpoint for stored procedures
      const response = await fetch(`${this.baseUrl}/rpc/execute_sql`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ query, params }),
      });

      if (!response.ok) {
        const error = await response.text();
        logger.error('Raw query execution failed', { query, error });
        return { data: null, error: `Query failed: ${error}` };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      logger.error('Raw query execution error', { query, error });
      return { data: null, error: 'Query execution failed' };
    }
  }

  // Transaction support (limited in REST API)
  async transaction<T>(operations: (() => Promise<any>)[]): Promise<DatabaseResponse<T[]>> {
    try {
      // Execute operations sequentially
      // Note: True ACID transactions require stored procedures in Supabase
      const results = [];
      for (const operation of operations) {
        const result = await operation();
        if (result.error) {
          throw new Error(result.error);
        }
        results.push(result.data);
      }

      return { data: results };
    } catch (error) {
      logger.error('Transaction failed', { error });
      return { data: [], error: 'Transaction failed' };
    }
  }

  // Health check for database connection
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/`, {
        method: 'HEAD',
        headers: this.headers,
      });

      return response.ok;
    } catch (error) {
      logger.error('Database health check failed', { error });
      return false;
    }
  }
}

// Singleton instance following TSmart patterns
export const db = new DatabaseService();

// Repository pattern implementation
export abstract class BaseRepository<T> {
  protected tableName: string;
  protected db: DatabaseService;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.db = db;
  }

  async findAll(options?: QueryOptions): Promise<DatabaseResponse<T[]>> {
    return this.db.findMany<T>(this.tableName, options);
  }

  async findById(id: string, options?: QueryOptions): Promise<DatabaseResponse<T | null>> {
    return this.db.findUnique<T>(this.tableName, id, options);
  }

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<DatabaseResponse<T>> {
    return this.db.create<T>(this.tableName, data);
  }

  async update(id: string, data: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>): Promise<DatabaseResponse<T>> {
    return this.db.update<T>(this.tableName, id, data);
  }

  async delete(id: string): Promise<DatabaseResponse<boolean>> {
    return this.db.delete(this.tableName, id);
  }

  async count(where?: Record<string, any>): Promise<number> {
    return this.db.count(this.tableName, where);
  }

  async exists(where: Record<string, any>): Promise<boolean> {
    return this.db.exists(this.tableName, where);
  }
}

export default db;

