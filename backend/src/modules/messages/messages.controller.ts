import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';
import { User } from '@/users/entities/user.entity';

import { MessagesService } from './messages.service';
import { Room } from './entities';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @ApiOperation({ summary: 'Get conversations' })
  @ApiResponse({ status: 200, type: Array<Room> })
  @UseGuards(AuthGuard)
  @Get('')
  getConversations(@Request() req) {
    const userId = req.user.id;
    return this.messagesService.getRooms(userId);
  }

  @ApiOperation({ summary: 'Get interlocutor' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(AuthGuard)
  @Get('interlocutor')
  getInterlocutor(
    @Request() req,
    @Query('roomId', ParseUUIDPipe) roomId: string,
  ) {
    const userId = req.user.id;
    return this.messagesService.getInterlocutor(userId, roomId);
  }

  @ApiOperation({ summary: 'Create room / conversation' })
  @ApiResponse({ status: 201, type: Room })
  @UseGuards(AuthGuard)
  @Post('')
  createRoom(@Request() req, @Body() body: { interlocutorId: number }) {
    const createRoomDto = {
      userId1: req.user.id,
      userId2: body.interlocutorId,
    };
    return this.messagesService.createRoom(createRoomDto);
  }
}
