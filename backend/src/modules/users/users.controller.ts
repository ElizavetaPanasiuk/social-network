import {
  Body,
  Controller,
  Get,
  Put,
  Param,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Delete,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthGuard } from '@/auth/auth.guard';

import { User } from './models/user.model';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  UpdateCommonProfileData,
  UpdatePasswordDto,
} from './dto';

@ApiTags('Users')
@Controller('users')
@UseGuards(AuthGuard)
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
  @ApiResponse({ status: 200, type: Array<User> })
  @Get()
  search(
    @Request() req,
    @Query('search') search: string,
    @Query('country') country: string,
    @Query('city') city: string,
    @Query('page') page: number,
  ) {
    const userId = req.user.id;
    return this.usersService.searchUsers(userId, search, country, city, page);
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.id;
    return this.usersService.getProfileById(id, userId);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    // TODO add cascade delete with other tables
    return this.usersService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Update profile data' })
  @ApiResponse({ status: 200 }) // add type
  @Put('profile/:id')
  updateCommonProfileData(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommonProfileData,
  ) {
    return this.usersService.updateCommonProfileData(id, dto);
  }

  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200 }) // add type
  @Put('password/:id')
  updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, dto);
  }

  @ApiOperation({ summary: 'Update user avatar' })
  @ApiResponse({ status: 200 }) // add type
  @Put('avatar/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  updateAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.updateAvatar(id, file);
  }
}
