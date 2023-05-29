import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsStrongPassword,
  IsDateString,
} from 'class-validator';

import { passwordValidationRules } from '@/utils/validation-rules';
import FIELDS_LENGTH from '@/constants/fields-length';

export class CreateUserDto {
  @IsString()
  @MinLength(FIELDS_LENGTH.FIRST_NAME.MIN)
  @MaxLength(FIELDS_LENGTH.FIRST_NAME.MAX)
  @ApiProperty({ example: 'Elizaveta', description: 'First name' })
  readonly firstName: string;

  @IsString()
  @MinLength(FIELDS_LENGTH.LAST_NAME.MIN)
  @MaxLength(FIELDS_LENGTH.LAST_NAME.MAX)
  @ApiProperty({ example: 'Panasiuk', description: 'Last name' })
  readonly lastName: string;

  @IsEmail()
  @MinLength(FIELDS_LENGTH.EMAIL.MIN)
  @MaxLength(FIELDS_LENGTH.EMAIL.MAX)
  @ApiProperty({ example: 'lizaveta.panasiuk@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'Password1111', description: 'Password' })
  @IsStrongPassword(passwordValidationRules)
  readonly password: string;

  @ApiProperty({
    example: '2002-03-12 00:00:00+02',
    description: 'Date of birth',
  })
  @IsDateString()
  readonly dateOfBirth: Date;

  @ApiProperty({ example: 'Belarus', description: ' Country' })
  @MinLength(FIELDS_LENGTH.COUNTRY.MIN)
  @MaxLength(FIELDS_LENGTH.COUNTRY.MAX)
  readonly country: string;

  @ApiProperty({ example: 'Minsk', description: 'City' })
  @MinLength(FIELDS_LENGTH.CITY.MIN)
  @MaxLength(FIELDS_LENGTH.CITY.MAX)
  readonly city: string;

  avatar: string;
}
