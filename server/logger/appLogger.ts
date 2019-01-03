import { getLogger, Logger, configure } from 'log4js';

export enum LogLevel {
  debug = 'debug',
  error = 'error',
  warn = 'warn'
}

export class AppLogger {
  private logger: Logger;

  constructor(category: string) {
    configure({
      appenders: { app: { type: 'file', filename: 'Logs/app.log' } },
      categories: { default: { appenders: ['app'], level: 'error' } }
    });

    this.logger = getLogger(category);
  }

  public writeLog(logLevel: LogLevel, ...args: any[]): void {
    switch (logLevel) {
      case LogLevel.debug:
        this.logger.level = 'debug';
        this.logger.debug(args);
        break;
      case LogLevel.error:
        this.logger.level = 'error';
        this.logger.error(args);
        break;
      case LogLevel.warn:
        this.logger.level = 'warn';
        this.logger.warn(args);
        break;
    }
  }
}
