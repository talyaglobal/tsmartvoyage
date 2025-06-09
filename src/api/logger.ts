// Logging service following TSmart standards
// Centralized logging with structured output

import { getLoggingConfig } from '@/config';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  requestId?: string;
  userId?: string;
  error?: Error;
}

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  private config: ReturnType<typeof getLoggingConfig>;
  private requestId?: string;

  constructor() {
    this.config = getLoggingConfig();
  }

  setRequestId(requestId: string): void {
    this.requestId = requestId;
  }

  debug(message: string, context?: Record<string, any>): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, any>): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, any>, error?: Error): void {
    this.log('error', message, { ...context, error: error?.stack });
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>): void {
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      requestId: this.requestId,
    };

    if (this.shouldLog(level)) {
      if (this.config.format === 'json') {
        console.log(JSON.stringify(logEntry));
      } else {
        console.log(`[${logEntry.timestamp}] ${level.toUpperCase()}: ${message}`, context || '');
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = ['debug', 'info', 'warn', 'error'];
    const configLevel = levels.indexOf(this.config.level);
    const messageLevel = levels.indexOf(level);
    return messageLevel >= configLevel;
  }
}

export const logger = new Logger();

