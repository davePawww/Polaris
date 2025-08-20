import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { createPrismaErrorHandler } from 'src/common/helpers/prisma-errors.util';
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
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
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
