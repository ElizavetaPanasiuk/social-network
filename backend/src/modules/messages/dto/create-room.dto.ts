import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: 1, description: 'User 1 id' })
  @IsInt()
  userId1: number;

  @ApiProperty({ example: 2, description: 'User 2 id' })
  @IsInt()
  userId2: number;
}
