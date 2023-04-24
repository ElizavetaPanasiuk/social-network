import { Module } from '@nestjs/common';
import { FriendRequestsController } from './friend-requests.controller';
import { FriendRequestsService } from './friend-requests.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { FriendRequest } from './friend-request.model';

@Module({
  controllers: [FriendRequestsController],
  providers: [FriendRequestsService],
  imports: [SequelizeModule.forFeature([FriendRequest, User])],
})
export class FriendRequestsModule {}
