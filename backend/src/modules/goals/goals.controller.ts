import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { GoalsService } from './goals.service';
import { Prisma } from '@prisma/client';
import {
  CreateGoalSchema,
  FindManyGoalsQuerySchema,
  GoalResponseSchema,
  GoalsPaginatedSchema,
} from './schemas/goal.schema';
import { ApiDocs } from 'src/common/decorators/api-docs.decorator';
import { Request } from 'express';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  @ApiDocs({
    summary: 'Create a new goal',
    responseSchema: GoalResponseSchema,
    status: 201,
    description: 'The goal has been successfully created.',
    errorResponses: [
      {
        status: 400,
        description: 'Bad Request - Invalid input data',
      },
    ],
  })
  async create(@Body() data: CreateGoalSchema, @Req() req: Request) {
    const userId = req.user?.id;
    return await this.goalsService.create({
      ...data,
      user: {
        connect: {
          clerkId: userId,
        },
      },
    });
  }

  @Get()
  @ApiDocs({
    summary: 'Get a list of goals',
    responseSchema: GoalsPaginatedSchema,
    status: 200,
    description: 'The goals have been successfully retrieved.',
    errorResponses: [
      {
        status: 400,
        description: 'Bad Request - Invalid input data',
      },
    ],
  })
  async findMany(
    @Query() query: FindManyGoalsQuerySchema,
    @Req() req: Request,
  ) {
    const clerkId = req.user?.id;

    if (!clerkId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return await this.goalsService.findMany(query, clerkId);
  }

  @Get(':id')
  @ApiDocs({
    summary: 'Get a goal by id',
    responseSchema: GoalResponseSchema,
    status: 200,
    description: 'The goal has been successfully retrieved.',
    errorResponses: [
      {
        status: 404,
        description: 'Not Found - Goal not found',
      },
    ],
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    const clerkId = req.user?.id;

    if (!clerkId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return await this.goalsService.findOne({ id }, clerkId);
  }

  @Patch(':id')
  @ApiDocs({
    summary: 'Update a goal by id',
    responseSchema: GoalResponseSchema,
    status: 200,
    description: 'The goal has been successfully updated.',
    errorResponses: [
      {
        status: 404,
        description: 'Not Found - Goal not found',
      },
      {
        status: 400,
        description: 'Bad Request - Invalid input data',
      },
    ],
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: Prisma.GoalUpdateInput,
    @Req() req: Request,
  ) {
    const clerkId = req.user?.id;

    if (!clerkId) {
      throw new UnauthorizedException('User not authenticated');
    }

    return await this.goalsService.update(
      {
        where: { id, user: { clerkId } },
        data,
      },
      clerkId,
    );
  }

  @Delete(':id')
  @ApiDocs({
    summary: 'Delete a goal by id',
    status: 204,
    description: 'The goal has been successfully deleted.',
    errorResponses: [
      {
        status: 404,
        description: 'Not Found - Goal not found',
      },
    ],
  })
  async delete(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    const clerkId = req.user?.id;

    if (!clerkId) {
      throw new UnauthorizedException('User not authenticated');
    }
    await this.goalsService.delete({ id }, clerkId);
  }
}
