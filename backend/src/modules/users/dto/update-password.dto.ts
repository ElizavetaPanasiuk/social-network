import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';
import { passwordValidationRules } from '../../../utils/validation-rules';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'Password1111', description: 'Password' })
  @IsStrongPassword(passwordValidationRules)
  readonly password: string;
}
