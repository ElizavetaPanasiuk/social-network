import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'Socket.IO-client';

const useChat = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  const [socket, setSocket] = useState<Socket>();
  const { roomId } = useParams();
  const [loading, setLoading] = useState(true);

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

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket?.on('messages', (messages) => {
      setMessages(messages);
      setLoading(false);
    });

    socket?.emit('messages:get');
  }, []);

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

  return { messages, loading, chatActions };
};

export default useChat;
