import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MinLength, MaxLength } from 'class-validator';

import { FIELDS_VALIDATION_RULES } from '@/lib/constants/fields-validation-rules';

export class CreatePostDto {
  @ApiProperty({ example: 'My first post', description: 'Post text content' })
  @IsString()
  @MinLength(FIELDS_VALIDATION_RULES.POST_TEXT.MIN)
  @MaxLength(FIELDS_VALIDATION_RULES.POST_TEXT.MAX)
  readonly text: string;

  @ApiProperty({
    example: 1,
    description: 'Author ID (from users table)',
  })
  @IsInt()
  userId: number;
}
