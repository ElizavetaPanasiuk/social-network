import { CreateMessageDto } from '@/messages/dto';
import { Message } from '@/messages/entities';

export interface MessagesRepository {
  create(dto: CreateMessageDto): Promise<Message>;
  getAllByRoomId(roomId: string): Promise<Array<Message>>;
}
