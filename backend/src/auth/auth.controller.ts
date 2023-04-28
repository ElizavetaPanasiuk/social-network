import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './sign-in.dto';
import { CreateUserDto } from '../users/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in with email and password' })
  @ApiResponse({ status: 201, type: SignInDto })
  @Post('signIn')
  singIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 201, type: SignInDto })
  @Post('signUp')
  @UseInterceptors(FileInterceptor('avatar'))
  signUp(
    @UploadedFile() file: Express.Multer.File,
    @Body() signUpDto: CreateUserDto,
  ) {
    return this.authService.singUp(file, signUpDto);
  }
}
