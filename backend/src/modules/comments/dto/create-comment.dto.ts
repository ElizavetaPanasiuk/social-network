import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

import FIELDS_LENGTH from '@/constants/fields-length';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Great thoughts!',
    description: 'Content of comment',
  })
  @IsString()
  @MinLength(FIELDS_LENGTH.COMMENT_TEXT.MIN)
  @MaxLength(FIELDS_LENGTH.COMMENT_TEXT.MAX)
  readonly text: string;

  @ApiProperty({
    example: 1,
    description: 'Id of the post related to the comment',
  })
  @IsInt()
  readonly postId: number;

  @ApiProperty({
    example: 2,
    description: 'Id of the user who is the author of the comment',
  })
  @IsInt()
  userId: number;
}
