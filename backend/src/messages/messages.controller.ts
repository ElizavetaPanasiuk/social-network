import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthGuard } from 'src/auth/auth.guard';
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
  @Post('')
  createRoom(@Request() req, @Body() createRoomDto: CreateRoomDto) {
    createRoomDto.userId1 = req.user.id;
    return this.messagesService.createRoom(createRoomDto);
  }
}
