import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength } from 'class-validator';

import FIELDS_LENGTH from '@/constants/fields-length';

export class CreatePostDto {
  @ApiProperty({ example: 'My first post', description: 'Post text content' })
  @IsString()
  @MinLength(FIELDS_LENGTH.POST_TEXT.MIN)
  @MaxLength(FIELDS_LENGTH.POST_TEXT.MAX)
  readonly text: string;

  @ApiProperty({
    example: 1,
    description: 'Author ID (from users table)',
  })
  @IsInt()
  userId: number;
}
