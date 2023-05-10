import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './room.model';
import { Message } from './message.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '..//users/user.model';
import { Op } from 'sequelize';
import { UsersService } from '..//users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(Message) private messageRepository: typeof Message,
    private usersService: UsersService,
  ) {}

  async createMessage(dto: CreateMessageDto) {
    return await this.messageRepository.create(dto);
  }

  async createRoom(dto: CreateRoomDto) {
    const room = await this.getRoom(dto.userId1, dto.userId2);
    if (room) {
      return room;
    }
    return await this.roomRepository.create(dto);
  }

  async getRooms(userId: number) {
    return await this.roomRepository.findAll({
      where: {
        [Op.or]: [{ userId1: userId }, { userId2: userId }],
      },
      include: [
        {
          model: User,
          as: 'user1',
          attributes: ['id', 'firstName', 'lastName', 'avatar'],
        },
        {
          model: User,
          as: 'user2',
          attributes: ['id', 'firstName', 'lastName', 'avatar'],
        },
      ],
    });
  }

  async getRoom(userId1: number, userId2: number) {
    const room = await this.roomRepository.findOne({
      where: {
        userId1: {
          [Op.or]: [userId1, userId2],
        },
        userId2: {
          [Op.or]: [userId1, userId2],
        },
      },
    });
    return room;
  }

  async getMessages(roomId: string) {
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

  async getInterlocutor(currentUserId: number, roomId: string) {
    const room = await this.roomRepository.findOne({
      where: {
        id: roomId,
      },
    });
    const interlocutorId =
      room.userId1 === currentUserId ? room.userId2 : room.userId1;
    return await this.usersService.getUserById(interlocutorId, currentUserId);
  }
}
