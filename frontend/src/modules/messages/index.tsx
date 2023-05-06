import { useSelector } from 'react-redux';
import { Message, MessageInput, MessagesHeader } from './components';
import styles from './styles.module.scss';
import { RootState } from '@/store';
import { useChat } from '@/hooks';
import { useState } from 'react';
import { Loader } from '@/ui-kit';

const MessagesPage = () => {
  const userId = useSelector((state: RootState) => state.user.id);

  const user = {
    avatar: 'images/d0dfacfa-e1f8-4c5a-bc71-ea31488056f0.jpg',
    firstName: 'Liza',
    lastName: 'Panasiuk',
  };

  const { messages, loading, chatActions } = useChat();

  const [text, setText] = useState('');
  const sendMessage = () => {
    const message = {
      userId,
      text,
      roomId: 1,
    };

    if (text.trim()) {
      chatActions.send(message);
      setText('');
    }
  };

  return (
    <div className={styles.messagesContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MessagesHeader {...user} />
          <div className={styles.messages}>
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
