import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

import { passwordValidationRules } from '@/utils/validation-rules';
import FIELDS_LENGTH from '@/constants/fields-length';

export class SignInDto {
  @IsEmail()
  @MinLength(FIELDS_LENGTH.EMAIL.MIN)
  @MaxLength(FIELDS_LENGTH.EMAIL.MAX)
  @ApiProperty({ example: 'lizaveta.panasiuk@gmail.com', description: 'Email' })
  readonly email: string;

  @IsStrongPassword(passwordValidationRules)
  @MaxLength(FIELDS_LENGTH.PASSWORD.MAX)
  @ApiProperty({ example: 'password1111', description: 'Password' })
  readonly password: string;
}
