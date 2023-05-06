import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './room.model';
import { Message } from './message.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from 'src/users/user.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(Message) private messageRepository: typeof Message,
  ) {}

  async createMessage(dto: CreateMessageDto) {
    return await this.messageRepository.create(dto);
  }

  async createRoom(dto: CreateRoomDto) {
    return await this.roomRepository.create(dto);
  }

  async getMessages(roomId: number) {
    return await this.messageRepository.findAll({
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
