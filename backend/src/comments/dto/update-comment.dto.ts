import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    example: 'Great thoughts!',
    description: 'Content of comment',
  })
  readonly text: string;
}
