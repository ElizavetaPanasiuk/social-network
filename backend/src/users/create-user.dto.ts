import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Elizaveta', description: 'First name' })
  readonly firstName: string;

  @ApiProperty({ example: 'Panasiuk', description: 'Last name' })
  readonly lastName: string;

  @ApiProperty({ example: 'lizaveta.panasiuk@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'password1111', description: 'Password' })
  readonly password: string;

  @ApiProperty({
    example: '2002-03-12 00:00:00+02',
    description: 'Date of birth',
  })
  readonly dateOfBirth: Date;

  @ApiProperty({ example: 'Belarus', description: ' Country' })
  readonly country: string;

  @ApiProperty({ example: 'Minsk', description: 'City' })
  readonly city: string;
}
