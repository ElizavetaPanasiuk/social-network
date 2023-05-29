import { IsInt, IsString, MinLength, MaxLength, IsUUID } from 'class-validator';

import FIELDS_LENGTH from '@/constants/fields-length';

export class CreateMessageDto {
  @IsString()
  @MinLength(FIELDS_LENGTH.MESSAGE_TEXT.MIN)
  @MaxLength(FIELDS_LENGTH.MESSAGE_TEXT.MAX)
  text: string;

  @IsInt()
  userId: number;

  @IsUUID()
  readonly roomId: string;
}
