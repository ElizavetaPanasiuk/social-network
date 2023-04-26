import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Great thoughts!',
    description: 'Content of comment',
  })
  readonly text: string;

  @ApiProperty({
    example: 1,
    description: 'Id of the post related to the comment',
  })
  readonly postId: number;

  @ApiProperty({
    example: 2,
    description: 'Id of the user who is the author of the comment',
  })
  readonly userId: number;
}
