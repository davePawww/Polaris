import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput) {
    return this.usersService.create(data);
  }

  @Get()
  findMany(
    @Query()
    query: {
      skip?: string;
      take?: string;
      cursor?: string;
      where?: string;
      orderBy?: string;
    },
  ) {
    return this.usersService.findMany({
      skip: query.skip ? Number(query.skip) : undefined,
      take: query.take ? Number(query.take) : undefined,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      where: query.where ? JSON.parse(query.where) : undefined,
      orderBy: query.orderBy ? JSON.parse(query.orderBy) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    return this.usersService.update({ where: { id }, data });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete({ id });
  }
}
