import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    // Get the HTTP context
    // with this ctx we can get the request and response objects
    const ctx = host.switchToHttp();
    // Get the request and response objects
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    // Extract request context (same as middleware for correlation)
    const requestId = request.headers['x-request-id'] || 'unknown';
    const method = request.method;
    const url = request.url;
    const path = request.route?.path || request.path;
    const query = request.query;
    const body = this.sanitizeBody(request.body);
    const userAgent = request.get('User-Agent') || '';
    const ip = request.ip || request.connection.remoteAddress || '';

    // Determine status code and message
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let stack: string | undefined;
    let errorType = 'UNKNOWN_ERROR';

    if (exception instanceof HttpException) {
      // If the exception is an HttpException, we can get the status code and message from the exception
      status = exception.getStatus();
      message = exception.message;
      stack = exception.stack;
      errorType = 'HTTP_EXCEPTION';
    } else if (exception instanceof Error) {
      // If the exception is an Error, we can get the message and stack from the exception
      message = exception.message;
      stack = exception.stack;
      errorType = exception.constructor.name;
    }

    // Log the error with full context (no duplication with middleware)
    // This is the error that will be logged to the console
    this.logger.error({
      type: 'REQUEST_ERROR',
      requestId,
      method,
      url,
      path,
      query,
      body,
      statusCode: status,
      errorType,
      message,
      userAgent,
      ip,
      stack,
      timestamp: new Date().toISOString(),
    });

    // Prepare error response
    // This is the error that will be sent to the client
    const errorResponse: any = {
      statusCode: status,
      message,
      requestId,
      timestamp: new Date().toISOString(),
      path: url,
    };

    // Add stack trace in development
    // This is the stack trace that will be sent to the client in development mode
    // if (process.env.NODE_ENV === 'development' && stack) {
    //   errorResponse.stack = stack;
    // }

    // Send the error response to the client
    response.status(status).json(errorResponse);
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
}
