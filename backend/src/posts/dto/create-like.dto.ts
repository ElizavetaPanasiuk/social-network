import { ApiProperty } from '@nestjs/swagger';

export class CreatePostLikeDto {
  @ApiProperty({
    example: 1,
    description: 'User Id',
  })
  readonly userId: number;

  @ApiProperty({
    example: 1,
    description: 'Post Id',
  })
  readonly postId: number;
}
