import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({ example: 'My first post', description: 'Post text content' })
  readonly text: string;
}
