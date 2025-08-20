import { Injectable } from '@nestjs/common';
import { Goal, Prisma } from '@prisma/client';
import { createPrismaErrorHandler } from 'src/common/helpers/prisma-errors.util';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class GoalsService {
  private readonly handleError = createPrismaErrorHandler('Goal');
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.GoalCreateInput): Promise<Goal> {
    try {
      return this.prisma.goal.create({
        data,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.GoalWhereUniqueInput;
    where?: Prisma.GoalWhereInput;
    orderBy?: Prisma.GoalOrderByWithRelationInput;
  }): Promise<Goal[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.goal.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(where: Prisma.GoalWhereUniqueInput): Promise<Goal | null> {
    try {
      return this.prisma.goal.findUnique({
        where,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(params: {
    where: Prisma.GoalWhereUniqueInput;
    data: Prisma.GoalUpdateInput;
  }): Promise<Goal> {
    const { where, data } = params;
    try {
      return this.prisma.goal.update({
        data,
        where,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(where: Prisma.GoalWhereUniqueInput): Promise<Goal> {
    try {
      return this.prisma.goal.delete({
        where,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }
}
