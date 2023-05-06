import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.model';
import { Room } from './room.model';
import { User } from 'src/users/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesGateway } from './messages.gateway';

@Module({
  providers: [MessagesService, MessagesGateway],
  imports: [SequelizeModule.forFeature([Message, Room, User])],
})
export class MessagesModule {}
