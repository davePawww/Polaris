import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

export function ApiDocs(options: {
  summary: string;
  responseSchema?: any;
  status?: number;
  description?: string;
  errorResponses?: Array<{
    status: number;
    description: string;
    schema?: any;
  }>;
}) {
  const decorators = [
    ApiOperation({ summary: options.summary }),
    ApiResponse({
      status: options.status || 200,
      description: options.description,
      type: options.responseSchema,
    }),
  ];

  if (options.errorResponses) {
    options.errorResponses.forEach((error) => {
      decorators.push(
        ApiResponse({
          status: error.status,
          description: error.description,
          schema: error.schema,
        }),
      );
    });
  }

  return applyDecorators(...decorators);
}
