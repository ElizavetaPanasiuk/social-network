import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server, Socket } from 'Socket.IO';
import { CreateMessageDto } from './dto/create-message.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

type UserSocket = {
  userId: string;
  roomId: string;
};

const users: Record<string, UserSocket> = {};

@WebSocketGateway({
  namespace: 'messages',
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('INIT SERVER');
  }

  @UseGuards(AuthGuard)
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const roomId = client.handshake.query.roomId as string;
    const socketId = client.id;
    users[socketId] = {
      userId,
      roomId,
    };
    this.server.to(socketId).socketsJoin(roomId);
  }

  handleDisconnect(client: Socket) {
    const socketId = client.id;
    delete users[socketId];
  }

  @SubscribeMessage('messages:get')
  async handleMessagesGet(client: Socket) {
    const socketId = client.id;
    const roomId = users[socketId].roomId;
    const messages = await this.messagesService.getMessages(roomId);
    this.server.to(roomId).emit('messages', messages);
  }

  @SubscribeMessage('messages:post')
  async handleMessagePost(client: Socket, payload: CreateMessageDto) {
    const createdMessage = await this.messagesService.createMessage(payload);
    this.server.to(payload.roomId).emit('message:post', createdMessage);
    this.handleMessagesGet(client);
  }
}
