import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength, IsUUID } from 'class-validator';

import { FIELDS_VALIDATION_RULES } from '@/lib/constants/fields-validation-rules';

export class CreateMessageDto {
  @ApiProperty({ example: 'Hi!', description: 'Message text' })
  @IsString()
  @MinLength(FIELDS_VALIDATION_RULES.MESSAGE_TEXT.MIN)
  @MaxLength(FIELDS_VALIDATION_RULES.MESSAGE_TEXT.MAX)
  text: string;

  @ApiProperty({ example: 1, description: 'Message author id' })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 'c7863489-b378-4e9c-b4e8-3e5407630eda',
    description: 'Room id',
  })
  @IsUUID()
  readonly roomId: string;
}
