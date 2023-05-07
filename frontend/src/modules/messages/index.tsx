import { Message, MessageInput, MessagesHeader } from './components';
import styles from './styles.module.scss';
import { useChat, useQuery } from '@/hooks';
import { useRef, useState } from 'react';
import { Loader } from '@/ui-kit';
import { MessagesService } from '@/lib/service';
import { useParams } from 'react-router-dom';

const MessagesPage = () => {
  const messagesService = new MessagesService();
  const { roomId } = useParams();
  const { messages, loading, chatActions } = useChat();
  const { data: user, loading: loadingUser } = useQuery(() => messagesService.getInterlocutor(roomId));

  const [text, setText] = useState('');
  const messagesContainerRef = useRef(null);
  const sendMessage = () => {
    const message = {
      text,
    };

    if (text.trim()) {
      chatActions.send(message);
      setText('');
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className={styles.messagesContainer}>
      {loading || loadingUser ? (
        <Loader />
      ) : (
        <>
          <MessagesHeader {...user} />
          <div
            className={styles.messages}
            ref={messagesContainerRef}
          >
            {messages.map((message) => (
              <Message
                key={message.id}
                {...message}
              />
            ))}
          </div>
          <MessageInput
            message={text}
            onChange={setText}
            onSend={sendMessage}
          />
        </>
      )}
    </div>
  );
};

export default MessagesPage;
