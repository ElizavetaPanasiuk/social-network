import { Repository } from 'sequelize-typescript';

import { User } from '@/users/models/user.model';

import { CreateMessageDto } from '@/messages/dto';
import { Message } from '@/messages/models';
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
