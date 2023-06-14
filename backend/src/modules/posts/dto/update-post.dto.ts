import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

import { FIELDS_VALIDATION_RULES } from '@/lib/constants/fields-validation-rules';

export class UpdatePostDto {
  @ApiProperty({ example: 'My first post', description: 'Post text content' })
  @IsString()
  @MinLength(FIELDS_VALIDATION_RULES.POST_TEXT.MIN)
  @MaxLength(FIELDS_VALIDATION_RULES.POST_TEXT.MAX)
  readonly text: string;
}
