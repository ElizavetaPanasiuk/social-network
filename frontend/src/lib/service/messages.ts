import Service from "./service";

class MessagesService extends Service {
  constructor() {
    super('messages');
  }

  getRooms() {
    return this.get();
  }
}

export default MessagesService