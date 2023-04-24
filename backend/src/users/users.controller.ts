import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  post(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.createUser(file, createUserDto);
  }

  @ApiOperation({ summary: 'Search users' })
  @ApiResponse({ status: 200, type: User })
  @Get()
  search(
    @Query('search') search: string,
    @Query('country') country: string,
    @Query('city') city: string,
    @Query('size') size: number,
    @Query('page') page: number,
  ) {
    return this.usersService.searchUsers(search, country, city, size, page);
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }
}
