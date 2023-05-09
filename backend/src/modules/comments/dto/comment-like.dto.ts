import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CommentLikeDto {
  @ApiProperty({
    example: 1,
    description: 'User Id',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'Comment Id',
  })
  @IsInt()
  readonly commentId: number;
}
