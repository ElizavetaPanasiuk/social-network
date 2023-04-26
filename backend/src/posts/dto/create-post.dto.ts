import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'My first post', description: 'Post text content' })
  readonly text: string;

  @ApiProperty({
    example: 1,
    description: 'Author ID (from users table)',
  })
  readonly authorId: number;
}
