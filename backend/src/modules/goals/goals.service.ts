import { Injectable } from '@nestjs/common';
import { Goal, Prisma } from '@prisma/client';
import { createPrismaErrorHandler } from 'src/common/helpers/prisma-errors.util';
import { PaginationMetadata } from 'src/common/schemas/pagination.schema';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GoalsService {
  private readonly handleError = createPrismaErrorHandler('Goal');
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.GoalCreateInput): Promise<Goal | undefined> {
    try {
      return await this.prisma.goal.create({
        data,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async findMany(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.GoalWhereUniqueInput;
      where?: Prisma.GoalWhereInput;
      orderBy?: Prisma.GoalOrderByWithRelationInput;
    },
    clerkId: string,
  ): Promise<
    | {
        payload: Goal[];
        meta: PaginationMetadata;
      }
    | undefined
  > {
    const { skip = 0, take = 10, cursor, orderBy, where } = params;
    try {
      const goals = await this.prisma.goal.findMany({
        skip,
        take,
        cursor,
        orderBy,
        where: {
          ...where,
          user: {
            clerkId,
          },
        },
      });

      const total = await this.prisma.goal.count({
        where: {
          ...where,
          user: { clerkId },
        },
      });

      const page = Math.floor(skip / take) + 1;
      const totalPages = Math.ceil(total / take);
      const hasNext = page < totalPages;
      const hasPrevious = page > 1;

      return {
        payload: goals,
        meta: {
          total,
          page,
          limit: take,
          totalPages,
          hasNext,
          hasPrevious,
        },
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(
    where: Prisma.GoalWhereUniqueInput,
    clerkId: string,
  ): Promise<Goal | null | undefined> {
    try {
      return await this.prisma.goal.findUnique({
        where: {
          ...where,
          user: { clerkId },
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(
    params: {
      where: Prisma.GoalWhereUniqueInput;
      data: Prisma.GoalUpdateInput;
    },
    clerkId: string,
  ): Promise<Goal | undefined> {
    const { where, data } = params;
    try {
      return await this.prisma.goal.update({
        data,
        where: {
          ...where,
          user: { clerkId },
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(where: Prisma.GoalWhereUniqueInput, clerkId: string) {
    try {
      await this.prisma.goal.delete({
        where: {
          ...where,
          user: { clerkId },
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }
}
