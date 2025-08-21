import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { createPrismaErrorHandler } from 'src/common/helpers/prisma-errors.util';
import { PaginationMetadata } from 'src/common/schemas/pagination.schema';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  private readonly handleError = createPrismaErrorHandler('User');
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return this.prisma.user.create({
        data,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<{
    data: User[];
    meta: PaginationMetadata;
  }> {
    const { skip = 0, take = 10, ...rest } = params;
    try {
      const users = await this.prisma.user.findMany({
        skip,
        take,
        ...rest,
      });

      const total = await this.prisma.user.count({ where: rest.where });

      const page = Math.floor(skip / take) + 1;
      const totalPages = Math.ceil(total / take);
      const hasNext = page < totalPages;
      const hasPrevious = page > 1;

      return {
        data: users,
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
      return this.handleError(error);
    }
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    try {
      return this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    try {
      return this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return this.prisma.user.delete({
        where,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }
}
