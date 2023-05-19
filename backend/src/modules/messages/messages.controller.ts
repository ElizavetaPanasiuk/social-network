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
import { MessagesService } from './messages.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @UseGuards(AuthGuard)
  @Get('')
  getConversations(@Request() req) {
    const userId = req.user.id;
    return this.messagesService.getRooms(userId);
  }

  @UseGuards(AuthGuard)
  @Get('interlocutor')
  getInterlocutor(
    @Request() req,
    @Query('roomId', ParseUUIDPipe) roomId: string,
  ) {
    const userId = req.user.id;
    return this.messagesService.getInterlocutor(userId, roomId);
  }

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
