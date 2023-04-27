import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentLikeDto {
  @ApiProperty({
    example: 1,
    description: 'User Id',
  })
  readonly userId: number;

  @ApiProperty({
    example: 1,
    description: 'Comment Id',
  })
  readonly commentId: number;
}
