import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CryptoModule } from '@/crypto/crypto.module';
import { User } from '@/users/models/user.model';
import { UsersModule } from '@/users/users.module';

import { MessagesService } from './messages.service';
import { Message, Room } from './models';
import { MessagesGateway } from './messages.gateway';
import { MessagesController } from './messages.controller';
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
