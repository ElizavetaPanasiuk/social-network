import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendRequestDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user who makes q request to friends',
  })
  readonly requestorId: number;

  @ApiProperty({
    example: 2,
    description:
      'ID of the user who receives a request to friends and declines or approves it',
  })
  readonly requesteeId: number;
}
