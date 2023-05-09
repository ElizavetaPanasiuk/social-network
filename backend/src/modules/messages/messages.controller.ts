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
import { CreateRoomDto } from './dto/create-room.dto';

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
  createRoom(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    createRoomDto.userId1 = req.user.id;
    return this.messagesService.createRoom(createRoomDto);
  }
}
