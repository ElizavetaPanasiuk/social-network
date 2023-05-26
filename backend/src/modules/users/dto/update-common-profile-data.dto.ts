import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsDateString } from 'class-validator';
import FIELDS_LENGTH from 'src/constants/fields-length';

export class UpdateCommonProfileData {
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
}
