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
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserSchema,
  FindManyUsersQuerySchema,
  UsersPaginatedSchema,
  UpdateUserSchema,
  UserResponseSchema,
} from './schemas/user.schema';
import { ApiDocs } from 'src/common/decorators/api-docs.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiDocs({
    summary: 'Create a new user',
    responseSchema: UserResponseSchema,
    status: 201,
    description: 'The user has been successfully created.',
    errorResponses: [
      {
        status: 400,
        description: 'Bad Request - Invalid input data',
      },
      {
        status: 409,
        description: 'Conflict - User already exists',
      },
    ],
  })
  create(@Body() data: CreateUserSchema) {
    return this.usersService.create(data);
  }

  @Get()
  @ApiDocs({
    summary: 'Get a list of users',
    responseSchema: UsersPaginatedSchema,
    status: 200,
    description: 'The users have been successfully retrieved.',
    errorResponses: [
      {
        status: 400,
        description: 'Bad Request - Invalid input data',
      },
    ],
  })
  findMany(@Query() query: FindManyUsersQuerySchema) {
    return this.usersService.findMany(query);
  }

  @Get(':id')
  @ApiDocs({
    summary: 'Get a user by id',
    responseSchema: UserResponseSchema,
    status: 200,
    description: 'The user has been successfully retrieved.',
    errorResponses: [
      {
        status: 404,
        description: 'Not Found - User not found',
      },
    ],
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  @ApiDocs({
    summary: 'Update a user by id',
    responseSchema: UserResponseSchema,
    status: 200,
    description: 'The user has been successfully updated.',
    errorResponses: [
      {
        status: 404,
        description: 'Not Found - User not found',
      },
      {
        status: 400,
        description: 'Bad Request - Invalid input data',
      },
    ],
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateUserSchema,
  ) {
    return this.usersService.update({ where: { id }, data });
  }

  @Delete(':id')
  @ApiDocs({
    summary: 'Delete a user by id',
    status: 204,
    responseSchema: undefined,
    description: 'The user has been successfully deleted.',
    errorResponses: [
      {
        status: 404,
        description: 'Not Found - User not found',
      },
    ],
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    this.usersService.delete({ id });
  }
}
