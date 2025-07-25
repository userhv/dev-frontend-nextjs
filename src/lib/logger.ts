type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, unknown>;
}

class Logger {
  private isProduction = process.env.NODE_ENV === 'production';

  private log(level: LogLevel, message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context,
    };

    if (!this.isProduction) {
      const consoleMethod = level === 'error' ? console.error : 
                           level === 'warn' ? console.warn : 
                           level === 'debug' ? console.debug : console.log;
      
      consoleMethod(`[${level.toUpperCase()}] ${message}`, context || '');
    } else {
      this.sendToExternalService(entry);
    }
  }

  private sendToExternalService(entry: LogEntry) {
    console.log('Production log entry:', entry);
  }

  info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, unknown>) {
    this.log('error', message, context);
  }

  debug(message: string, context?: Record<string, unknown>) {
    this.log('debug', message, context);
  }

  apiError(message: string, error: unknown, context?: Record<string, unknown>) {
    const errorDetails = error instanceof Error ? 
      { message: error.message, stack: error.stack } : 
      { error };
    
    this.error(message, { ...errorDetails, ...context });
  }
}

export const logger = new Logger();
