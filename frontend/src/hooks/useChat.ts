import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'Socket.IO-client';

import { RootState } from '@/store';

const useChat = () => {
  const { roomId } = useParams();
  const userId = useSelector((state: RootState) => state.user.id);
  const [socket, setSocket] = useState<Socket>();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  const send = (text: string) => {
    const payload = {
      roomId,
      userId,
      text,
    };
    socket?.emit('messages:post', payload);
  };

  const chatActions = {
    send,
  };

  useEffect(() => {
    if (!socket) {
      setSocket(
        io('http://localhost:5000/messages', {
          query: {
            userId,
            roomId,
          },
        }).on('connection', (socket) => socket.join(roomId)),
      );
    }

    socket?.on('messages', (messages) => {
      setMessages(messages);
      setLoading(false);
    });

    socket?.emit('messages:get');
  }, []);

  return { messages, loading, chatActions };
};

export default useChat;
