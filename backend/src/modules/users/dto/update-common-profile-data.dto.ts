import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsDateString } from 'class-validator';

import { FIELDS_VALIDATION_RULES } from '@/lib/constants/fields-validation-rules';

export class UpdateCommonProfileData {
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
}
