import { Inject, Injectable } from '@nestjs/common';

import { CryptoService } from '@/crypto/crypto.service';
import { UsersService } from '@/users/users.service';
import { Repository } from '@/lib/enums/repositories';

import { CreateMessageDto, CreateRoomDto } from './dto';
import { RoomsRepository } from './repositories/rooms/rooms.repository.interface';
import { MessagesRepository } from './repositories/messages/messages.repository.interface';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(Repository.Rooms) private roomsRepository: RoomsRepository,
    @Inject(Repository.Messages)
    private messagesRepository: MessagesRepository,
    private usersService: UsersService,
    private cryptoService: CryptoService,
  ) {}

  createMessage(dto: CreateMessageDto) {
    const text = this.cryptoService.encrypt(dto.text);
    dto.text = text;
    return this.messagesRepository.create(dto);
  }

  async createRoom(dto: CreateRoomDto) {
    const room = await this.roomsRepository.getOneByUsersIds(
      dto.userId1,
      dto.userId2,
    );
    if (room) {
      return room;
    }
    return this.roomsRepository.create(dto);
  }

  getRooms(userId: number) {
    return this.roomsRepository.getManyByUserId(userId);
  }

  async getMessages(roomId: string) {
    const messages = await this.messagesRepository.getAllByRoomId(roomId);
    messages.forEach(
      (message) => (message.text = this.cryptoService.decrypt(message.text)),
    );

    return messages;
  }

  async getInterlocutor(currentUserId: number, roomId: string) {
    const room = await this.roomsRepository.getById(roomId);
    const interlocutorId =
      room.userId1 === currentUserId ? room.userId2 : room.userId1;
    return this.usersService.getUserById(interlocutorId);
  }
}
