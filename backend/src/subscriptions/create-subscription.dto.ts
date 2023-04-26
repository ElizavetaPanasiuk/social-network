import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 1, description: '' })
  readonly subscriberId: number;

  @ApiProperty({ example: 2, description: '' })
  readonly profileId: number;
}
