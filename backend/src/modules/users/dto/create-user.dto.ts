import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsStrongPassword,
  IsDateString,
} from 'class-validator';

import {
  PASSWORD_VALIDATION_RULES,
  FIELDS_VALIDATION_RULES,
} from '@/lib/constants/fields-validation-rules';

export class CreateUserDto {
  @IsString()
  @MinLength(FIELDS_VALIDATION_RULES.FIRST_NAME.MIN)
  @MaxLength(FIELDS_VALIDATION_RULES.FIRST_NAME.MAX)
  @ApiProperty({ example: 'Elizaveta', description: 'First name' })
  readonly firstName: string;

  @IsString()
  @MinLength(FIELDS_VALIDATION_RULES.LAST_NAME.MIN)
  @MaxLength(FIELDS_VALIDATION_RULES.LAST_NAME.MAX)
  @ApiProperty({ example: 'Panasiuk', description: 'Last name' })
  readonly lastName: string;

  @IsEmail()
  @MinLength(FIELDS_VALIDATION_RULES.EMAIL.MIN)
  @MaxLength(FIELDS_VALIDATION_RULES.EMAIL.MAX)
  @ApiProperty({ example: 'lizaveta.panasiuk@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'Admin123', description: 'Password' })
  @IsStrongPassword(PASSWORD_VALIDATION_RULES)
  readonly password: string;

  @ApiProperty({
    example: '2002-03-12 00:00:00+02',
    description: 'Date of birth',
  })
  @IsDateString()
  readonly dateOfBirth: Date;

  @ApiProperty({ example: 'Belarus', description: ' Country' })
  @MinLength(FIELDS_VALIDATION_RULES.COUNTRY.MIN)
  @MaxLength(FIELDS_VALIDATION_RULES.COUNTRY.MAX)
  readonly country: string;

  @ApiProperty({ example: 'Minsk', description: 'City' })
  @MinLength(FIELDS_VALIDATION_RULES.CITY.MIN)
  @MaxLength(FIELDS_VALIDATION_RULES.CITY.MAX)
  readonly city: string;

  avatar: string;
}
