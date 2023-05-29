import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from '@/users/dto';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiResponse({ status: 201 }) // add type
  @Post('signIn')
  singIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 201 }) // add type
  @Post('signUp')
  @UseInterceptors(FileInterceptor('avatar'))
  signUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() signUpDto: CreateUserDto,
  ) {
    return this.authService.singUp(file, signUpDto);
  }
}
