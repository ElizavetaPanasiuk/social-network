import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

import { PASSWORD_VALIDATION_RULES } from '@/lib/constants/fields-validation-rules';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'Admin123', description: 'Password' })
  @IsStrongPassword(PASSWORD_VALIDATION_RULES)
  password: string;
}
