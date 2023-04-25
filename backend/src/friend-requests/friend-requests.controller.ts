import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { FriendRequestsService } from './friend-requests.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateFriendRequestDto } from './create-friend-request.dto';

@Controller('friend-requests')
export class FriendRequestsController {
  constructor(private friendRequestsService: FriendRequestsService) {}

  @ApiOperation({ summary: 'Create friend request' })
  @Post()
  async createRequest(@Body() createFriendRequestDto: CreateFriendRequestDto) {
    return this.friendRequestsService.createRequest(createFriendRequestDto);
  }

  @ApiOperation({ summary: 'Approve friend request' })
  @Put('approve/:id')
  async approveRequest(@Param('id') id: number) {
    return this.friendRequestsService.approveRequest(id);
  }

  @ApiOperation({ summary: 'Decline friend request' })
  @Put('decline/:id')
  async declineRequest(@Param('id') id: number) {
    return this.friendRequestsService.declineRequest(id);
  }

  @ApiOperation({ summary: 'Cancel friend request' })
  @Delete('cancel/:id')
  async cancelRequest(@Param('id') id: number) {
    return this.friendRequestsService.cancelRequest(id);
  }

  @ApiOperation({
    summary:
      'Get a list of friend requests waiting for other user (requestee) to approve or decline',
  })
  @Get('outcoming/:userId')
  async getOutcomingRequests(@Param('userId') userId: number) {
    // TODO: get userID from token
    return this.friendRequestsService.getOutcomingRequests(userId);
  }

  @ApiOperation({
    summary:
      'Get a list of friend requests waiting for your (requester) approve or decline',
  })
  @Get('incoming/:userId')
  async getIncomingRequests(@Param('userId') userId: number) {
    return this.friendRequestsService.getIncomingRequests(userId);
    //TODO: get userID from token
  }

  @ApiOperation({ summary: 'Get list of friends' })
  @Get('approved/:userId')
  async getFriends(@Param('userId') userId: number) {
    //TODO: get userID from token
    return this.friendRequestsService.getFriendsByUserId(userId);
  }
}
