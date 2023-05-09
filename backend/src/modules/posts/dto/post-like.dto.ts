import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class PostLikeDto {
  @ApiProperty({
    example: 1,
    description: 'User Id',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 1,
    description: 'Post Id',
  })
  @IsInt()
  readonly postId: number;
}
