import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'lizaveta.panasiuk@gmail.com', description: 'Email' })
  readonly email: string;

  @ApiProperty({ example: 'password1111', description: 'Password' })
  readonly password: string;
}
