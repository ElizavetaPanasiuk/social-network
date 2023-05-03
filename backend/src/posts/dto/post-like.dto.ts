import { ApiProperty } from '@nestjs/swagger';

export class PostLikeDto {
  @ApiProperty({
    example: 1,
    description: 'User Id',
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'Post Id',
  })
  readonly postId: number;
}
