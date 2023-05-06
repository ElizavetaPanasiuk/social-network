import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'Socket.IO-client';

let socket: Socket;

const useChat = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const [loading, setLoading] = useState(true);

  if (!socket) {
    socket = io('http://localhost:5000/messages', {
      query: {
        id: userId,
      },
    }).on('connection', (socket) => socket.join('1'));
  }

  const [messages, setMessages] = useState();

  useEffect(() => {
    socket.on('log', (log: string) => {
      console.log('log');
    });

    socket.on('messages', (messages) => {
      setMessages(messages);
      setLoading(false);
    });

    socket.emit('messages:get');
  }, []);

  const send = (payload) => {
    socket.emit('message:post', payload);
  };

  const chatActions = {
    send,
  };

  return { messages, loading, chatActions };
};

export default useChat;
