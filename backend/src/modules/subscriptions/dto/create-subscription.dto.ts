import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 1, description: '' })
  @IsInt()
  readonly subscriberId: number;

  @ApiProperty({ example: 2, description: '' })
  @IsInt()
  readonly profileId: number;
}
