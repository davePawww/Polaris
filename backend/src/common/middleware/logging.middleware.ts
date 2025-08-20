import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();
    const requestId = req.headers['x-request-id'] || this.generateRequestId();

    // Add request ID to headers for correlation
    req.headers['x-request-id'] = requestId;

    // Log request start
    this.logger.log({
      type: 'REQUEST_START',
      requestId,
      method: req.method,
      url: req.url,
      path: req.route?.path || req.path,
      query: req.query,
      body: this.sanitizeBody(req.body),
      headers: this.sanitizeHeaders(req.headers),
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.connection.remoteAddress,
      timestamp: new Date().toISOString(),
    });

    // Listen for response finish event to log response details
    res.on('finish', () => {
      const duration = Date.now() - startTime;

      this.logger.log({
        type: 'REQUEST_SUCCESS',
        requestId,
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });
    });

    next();
  }

  // This is a helper function to sanitize the body of the request
  // It is used to remove sensitive information from the request body
  // This is to prevent sensitive information from being logged to the console
  // and to prevent sensitive information from being sent to the client
  private sanitizeBody(body: any): any {
    if (!body) return body;

    const sanitized = { ...body };
    const sensitiveFields = [
      'password',
      'token',
      'secret',
      'key',
      'authorization',
    ];

    sensitiveFields.forEach((field) => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });

    return sanitized;
  }

  // This is a helper function to sanitize the headers of the request
  // It is used to remove sensitive information from the request headers
  // This is to prevent sensitive information from being logged to the console
  // and to prevent sensitive information from being sent to the client
  private sanitizeHeaders(headers: any): any {
    const sanitized = { ...headers };
    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];

    sensitiveHeaders.forEach((header) => {
      if (sanitized[header]) {
        sanitized[header] = '[REDACTED]';
      }
    });

    return sanitized;
  }

  // This is a helper function to generate a request ID
  // It is used to generate a unique request ID for the request
  // This is to help with correlation of requests
  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
