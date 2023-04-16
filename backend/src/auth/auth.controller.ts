import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './sign-in.dto';
import { CreateUserDto } from 'src/users/create-user.dto';

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
  signUp(@Body() signUpDto: CreateUserDto) {
    return this.authService.singUp(signUpDto);
  }
}