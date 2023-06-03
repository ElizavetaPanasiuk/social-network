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
  const [error, setError] = useState({ value: false, message: '' });

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
        io(`${import.meta.env.VITE_API_URL}/messages`, {
          query: {
            userId,
            roomId,
          },
        })
          .on('connection', (socket) => socket.join(roomId))
          .on('error', (error) => {
            if (error instanceof Error) {
              setError({ value: true, message: error.message });
            }
          }),
      );
    }

    socket
      ?.on('messages', (messages) => {
        setMessages(messages);
        setLoading(false);
      })
      .on('error', (error) => {
        if (error instanceof Error) {
          setError({ value: true, message: error.message });
        }
      });

    socket?.emit('messages:get');
  }, []);

  return { messages, loading, chatActions, error };
};

export default useChat;
