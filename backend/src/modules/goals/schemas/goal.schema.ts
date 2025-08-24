import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  paginatedResponseSchema,
  paginationQuerySchema,
} from 'src/common/schemas/pagination.schema';

const createGoalSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  completed: z.boolean().default(false),
});

const findManyGoalsQuerySchema = paginationQuerySchema;

const updateGoalSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export const goalResponseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
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

export class CreateGoalSchema extends createZodDto(createGoalSchema) {}
export class FindManyGoalsQuerySchema extends createZodDto(
  findManyGoalsQuerySchema,
) {}
export class UpdateGoalSchema extends createZodDto(updateGoalSchema) {}
export class GoalResponseSchema extends createZodDto(goalResponseSchema) {}
export class GoalsPaginatedSchema extends createZodDto(
  paginatedResponseSchema(goalResponseSchema),
) {}
