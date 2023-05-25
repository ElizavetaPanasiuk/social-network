import { Repository } from 'sequelize-typescript';
import { CreateMessageDto } from 'src/modules/messages/dto/create-message.dto';
import { Message } from 'src/modules/messages/models/message.model';
import { User } from 'src/modules/users/models/user.model';
import { MessagesRepository } from '../messages.repository.interface';

export class MessagesPgRepository implements MessagesRepository {
  constructor(private messagesRepository: Repository<Message>) {}

  create(dto: CreateMessageDto) {
    return this.messagesRepository.create(dto);
  }

  getAllByRoomId(roomId: string) {
    return this.messagesRepository.findAll({
      where: {
        roomId,
      },
      order: [['createdAt', 'ASC']],
      include: {
        model: User,
        as: 'user',
        attributes: ['firstName', 'lastName', 'avatar'],
      },
    });
  }
}
