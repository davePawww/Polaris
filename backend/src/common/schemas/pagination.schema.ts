import { z } from 'zod';

export interface PaginationMetadata {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const paginationQuerySchema = z.object({
  skip: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  take: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined)),
  cursor: z
    .string()
    .optional()
    .transform((val) => (val ? { id: val } : undefined)),
  where: z
    .string()
    .optional()
    .transform((val) => (val ? JSON.parse(val) : undefined)),
  orderBy: z
    .string()
    .optional()
    .transform((val) => (val ? JSON.parse(val) : undefined)),
});

export const paginationMetadataSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
});

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) =>
  z.object({
    data: z.array(dataSchema),
    meta: paginationMetadataSchema,
  });
