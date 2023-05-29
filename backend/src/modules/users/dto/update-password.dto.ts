import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

import { passwordValidationRules } from '@/utils/validation-rules';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'Admin123', description: 'Password' })
  @IsStrongPassword(passwordValidationRules)
  password: string;
}
