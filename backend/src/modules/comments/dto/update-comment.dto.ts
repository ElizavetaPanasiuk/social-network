import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

import FIELDS_LENGTH from '@/constants/fields-length';

export class UpdateCommentDto {
  @ApiProperty({
    example: 'Updated comment content',
    description: 'Content of comment',
  })
  @IsString()
  @MinLength(FIELDS_LENGTH.COMMENT_TEXT.MIN)
  @MaxLength(FIELDS_LENGTH.COMMENT_TEXT.MAX)
  readonly text: string;
}
