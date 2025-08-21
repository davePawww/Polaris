import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { paginatedResponseSchema } from 'src/common/schemas/pagination.schema';

const createUserSchema = z.object({
  clerkId: z.string(),
  role: z.enum(['basic', 'admin']).default('basic'),
  timezone: z.string().optional(),
});

const findManyUsersQuerySchema = z.object({
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

const updateUserSchema = z.object({
  role: z.enum(['basic', 'admin']).optional(),
  timezone: z.string().optional(),
});

export const userResponseSchema = z.object({
  id: z.string(),
  clerkId: z.string(),
  role: z.enum(['basic', 'admin']).default('basic'),
  timezone: z.string(),
  goals: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      completed: z.boolean(),
    }),
  ),
  sessions: z.array(
    z.object({
      id: z.string(),
      startedAt: z.iso.datetime(),
      duration: z.number(),
    }),
  ),
  notes: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      content: z.string().optional(),
      tags: z.array(z.string()),
    }),
  ),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export class CreateUserSchema extends createZodDto(createUserSchema) {}
export class FindManyUsersQuerySchema extends createZodDto(
  findManyUsersQuerySchema,
) {}
export class UpdateUserSchema extends createZodDto(updateUserSchema) {}
export class UserResponseSchema extends createZodDto(userResponseSchema) {}
export class UsersPaginatedSchema extends createZodDto(
  paginatedResponseSchema(userResponseSchema),
) {}
