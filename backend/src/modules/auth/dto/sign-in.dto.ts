import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

import {
  PASSWORD_VALIDATION_RULES,
  FIELDS_VALIDATION_RULES,
} from '@/lib/constants/fields-validation-rules';

export class SignInDto {
  @ApiProperty({ example: 'lizaveta.panasiuk@gmail.com', description: 'Email' })
  @IsEmail()
  @MinLength(FIELDS_VALIDATION_RULES.EMAIL.MIN)
  @MaxLength(FIELDS_VALIDATION_RULES.EMAIL.MAX)
  readonly email: string;

  @ApiProperty({ example: 'Admin123', description: 'Password' })
  @IsStrongPassword(PASSWORD_VALIDATION_RULES)
  @MaxLength(FIELDS_VALIDATION_RULES.PASSWORD.MAX)
  readonly password: string;
}
