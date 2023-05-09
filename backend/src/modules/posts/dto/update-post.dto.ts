import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';
import FIELDS_LENGTH from 'src/constants/fields-length';

export class UpdatePostDto {
  @ApiProperty({ example: 'My first post', description: 'Post text content' })
  @IsString()
  @MinLength(FIELDS_LENGTH.POST_TEXT.MIN)
  @MaxLength(FIELDS_LENGTH.POST_TEXT.MAX)
  readonly text: string;
}
