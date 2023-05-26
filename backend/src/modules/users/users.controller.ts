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
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: User })
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const currentUserId = req.user.id;
    return this.usersService.getProfileById(id, currentUserId);
  }

  @ApiOperation({ summary: 'Delete user' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    // TODO add cascade delete with other tables
    return this.usersService.deleteUser(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @UseGuards(AuthGuard)
  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateUserDto,
  ) {
    return this.usersService.updateUser(id, dto);
  }
}
