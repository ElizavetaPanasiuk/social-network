import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { FIELDS_VALIDATION_RULES } from '@/lib/constants/fields-validation-rules';

export class UpdateCommentDto {
  @ApiProperty({
    example: 'Updated comment content',
    description: 'Content of comment',
  })
  @IsString()
  @MinLength(FIELDS_VALIDATION_RULES.COMMENT_TEXT.MIN)
  @MaxLength(FIELDS_VALIDATION_RULES.COMMENT_TEXT.MAX)
  readonly text: string;
}
