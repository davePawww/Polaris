import { ConflictException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export const handlePrismaError = (
  error: unknown,
  entityName: string = 'Record',
): never => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002')
      throw new ConflictException(`${entityName || 'Record'} already exists`);
    if (error.code === 'P2025')
      throw new NotFoundException(`${entityName || 'Record'} not found`);
    if (error.code === 'P2003')
      throw new ConflictException(
        `Cannot delete ${(entityName || 'record').toLowerCase()} with existing data`,
      );
  }
  throw error;
};

export const createPrismaErrorHandler = (entityName: string) => {
  return (error: unknown) => handlePrismaError(error, entityName);
};
