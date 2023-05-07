import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './message.model';
import { Room } from './room.model';
import { User } from 'src/users/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesGateway } from './messages.gateway';
import { MessagesController } from './messages.controller';

@Module({
  providers: [MessagesService, MessagesGateway],
  imports: [SequelizeModule.forFeature([Message, Room, User])],
  controllers: [MessagesController],
})
export class MessagesModule {}
