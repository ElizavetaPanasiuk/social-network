import {
  MessageBody,
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

const users: Record<string, string> = {};

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

  handleConnection(client: Socket) {
    const userName = client.handshake.query.userName as string;
    const socketId = client.id;
    users[socketId] = userName;

    // TODO : roomId in to()
    client.to('1').emit('log', `${userName} connected`);
  }

  handleDisconnect(client: Socket) {
    const socketId = client.id;
    const userName = users[socketId];
    delete users[socketId];

    // TODO : roomId in to()
    client.to('1').emit('log', `${userName} disconnected`);
  }

  @SubscribeMessage('messages:get')
  async handleMessagesGet() {
    const roomId = 1; // TODO: roomId from request
    const messages = await this.messagesService.getMessages(roomId);
    this.server.emit('messages', messages);
  }

  @SubscribeMessage('message:post')
  async handleMessagePost(
    @MessageBody()
    payload: CreateMessageDto,
  ) {
    const createdMessage = await this.messagesService.createMessage(payload);
    this.server.emit('message:post', createdMessage);
    this.handleMessagesGet();
  }
}
