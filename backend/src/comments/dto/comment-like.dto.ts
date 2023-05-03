import { ApiProperty } from '@nestjs/swagger';

export class CommentLikeDto {
  @ApiProperty({
    example: 1,
    description: 'User Id',
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'Comment Id',
  })
  readonly commentId: number;
}
