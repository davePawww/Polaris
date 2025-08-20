import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const requestId =
      request.headers['x-request-id'] || this.generateRequestId();
    const method = request.method;
    const url = request.url;
    const userAgent = request.get('User-Agent') || 'Unknown';
    const ip = request.ip || '';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let stack: string | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      stack = exception.stack;
    } else if (exception instanceof Error) {
      message = exception.message;
      stack = exception.stack;
    }

    this.logger.error({
      message: `Exception caught: ${message}`,
      requestId,
      method,
      url,
      statusCode: status,
      userAgent,
      ip,
      stack,
      timestamp: new Date().toISOString(),
    });

    const errorResponse = {
      statusCode: status,
      message,
      requestId,
      timestamp: new Date().toISOString(),
      path: url,
    };

    response.status(status).json(errorResponse);
  }

  private generateRequestId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
