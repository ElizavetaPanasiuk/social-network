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
  @ApiProperty({ example: 'lizaveta.panasiuk@gmail.com', description: 'Email' })
  @IsEmail()
  @MinLength(FIELDS_LENGTH.EMAIL.MIN)
  @MaxLength(FIELDS_LENGTH.EMAIL.MAX)
  readonly email: string;

  @ApiProperty({ example: 'Admin123', description: 'Password' })
  @IsStrongPassword(passwordValidationRules)
  @MaxLength(FIELDS_LENGTH.PASSWORD.MAX)
  readonly password: string;
}
