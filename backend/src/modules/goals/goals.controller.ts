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
import { GoalsService } from './goals.service';
import { Prisma } from '@prisma/client';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@Body() data: Prisma.GoalCreateInput) {
    return this.goalsService.create(data);
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
    return this.goalsService.findMany({
      skip: query.skip ? Number(query.skip) : undefined,
      take: query.take ? Number(query.take) : undefined,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      where: query.where ? JSON.parse(query.where) : undefined,
      orderBy: query.orderBy ? JSON.parse(query.orderBy) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalsService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.GoalUpdateInput) {
    return this.goalsService.update({ where: { id }, data });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.goalsService.delete({ id });
  }
}
