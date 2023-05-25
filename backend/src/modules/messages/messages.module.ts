import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './models/message.model';
import { Room } from './models/room.model';
import { User } from '../users/models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesGateway } from './messages.gateway';
import { MessagesController } from './messages.controller';
import { UsersModule } from '../users/users.module';
import { CryptoModule } from '../crypto/crypto.module';
import { provideRoomsRepository } from './repositories/rooms/rooms.repository.provider';
import { provideMessagesRepository } from './repositories/messages/messages.repository.provider';

@Module({
  providers: [
    MessagesService,
    MessagesGateway,
    ...provideRoomsRepository(),
    ...provideMessagesRepository(),
  ],
  imports: [
    SequelizeModule.forFeature([Message, Room, User]),
    UsersModule,
    CryptoModule,
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}
