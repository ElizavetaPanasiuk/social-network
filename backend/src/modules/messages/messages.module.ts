import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.model';
import { Room } from './room.model';
import { User } from '../users/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesGateway } from './messages.gateway';
import { MessagesController } from './messages.controller';
import { UsersModule } from '../users/users.module';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
  providers: [MessagesService, MessagesGateway],
  imports: [
    SequelizeModule.forFeature([Message, Room, User]),
    UsersModule,
    CryptoModule,
  ],
  controllers: [MessagesController],
})
export class MessagesModule {}
