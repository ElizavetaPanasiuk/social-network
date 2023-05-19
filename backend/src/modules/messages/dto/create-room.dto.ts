import { IsInt } from 'class-validator';

export class CreateRoomDto {
  @IsInt()
  userId1: number;

  @IsInt()
  userId2: number;
}
