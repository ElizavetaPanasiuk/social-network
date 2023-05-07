import Service from './service';

class MessagesService extends Service {
  constructor() {
    super('messages');
  }

  getRooms() {
    return this.get();
  }

  getInterlocutor(roomId: string) {
    return this.get({ roomId }, '/interlocutor');
  }
}

export default MessagesService;
