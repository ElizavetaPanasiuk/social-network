import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Room } from './room.model';
import { Message } from './message.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateRoomDto } from './dto/create-room.dto';
import { User } from '..//users/user.model';
import { Op } from 'sequelize';
import { UsersService } from '..//users/users.service';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Room) private roomRepository: typeof Room,
    @InjectModel(Message) private messageRepository: typeof Message,
    private usersService: UsersService,
    private cryptoService: CryptoService,
  ) {}

  createMessage(dto: CreateMessageDto) {
    const text = this.cryptoService.encrypt(dto.text);
    return this.messageRepository.create({
      roomId: dto.roomId,
      userId: dto.userId,
      text,
    });
  }

  async createRoom(dto: CreateRoomDto) {
    const room = await this.getRoom(dto.userId1, dto.userId2);
    if (room) {
      return room;
    }
    return this.roomRepository.create(dto);
  }

  getRooms(userId: number) {
    return this.roomRepository.findAll({
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

  getRoom(userId1: number, userId2: number) {
    return this.roomRepository.findOne({
      where: {
        userId1: {
          [Op.or]: [userId1, userId2],
        },
        userId2: {
          [Op.or]: [userId1, userId2],
        },
      },
    });
  }

  async getMessages(roomId: string) {
    const messages = await this.messageRepository.findAll({
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
    messages.forEach(
      (message) => (message.text = this.cryptoService.decrypt(message.text)),
    );

    return messages;
  }

  async getInterlocutor(currentUserId: number, roomId: string) {
    const room = await this.roomRepository.findOne({
      where: {
        id: roomId,
      },
    });
    const interlocutorId =
      room.userId1 === currentUserId ? room.userId2 : room.userId1;
    return this.usersService.getUserById(interlocutorId);
  }
}
