export class CreateMessageDto {
  readonly text: string;

  userId: number;

  readonly roomId: string;
}
