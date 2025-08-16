import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return {
      success: true,
      message: 'Users fetched successfully',
      data: [],
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      success: true,
      message: 'User fetched successfully',
      data: [],
    };
  }
}
