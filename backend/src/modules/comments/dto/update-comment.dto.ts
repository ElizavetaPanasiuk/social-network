import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import FIELDS_LENGTH from 'src/constants/fields-length';

export class UpdateCommentDto {
  @ApiProperty({
    example: 'Great thoughts!',
    description: 'Content of comment',
  })
  @IsString()
  @MinLength(FIELDS_LENGTH.COMMENT_TEXT.MIN)
  @MaxLength(FIELDS_LENGTH.COMMENT_TEXT.MAX)
  readonly text: string;
}
