import { CreateMessageDto } from '../../dto/create-message.dto';
import { Message } from '../../entities/message.entity';

export interface MessagesRepository {
  create(dto: CreateMessageDto): Promise<Message>;
  getAllByRoomId(roomId: string): Promise<Array<Message>>;
}
