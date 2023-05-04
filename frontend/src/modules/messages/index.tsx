import { Message, MessageInput, MessagesHeader } from './components';
import styles from './styles.module.scss';

const MessagesPage = () => {
  const user = {
    avatar: 'images/d0dfacfa-e1f8-4c5a-bc71-ea31488056f0.jpg',
    firstName: 'Liza',
    lastName: 'Panasiuk',
  };

  const messages = [
    {
      id: 1,
      text: 'message',
      user: {
        firstName: 'Liza',
        lastName: 'Panasiuk',
        avatar: 'images/d0dfacfa-e1f8-4c5a-bc71-ea31488056f0.jpg',
      },
    },
  ];

  return (
    <div className={styles.messagesContainer}>
      <MessagesHeader {...user} />
      {messages.map((message) => (
        <Message
          key={message.id}
          {...message}
        />
      ))}
      <MessageInput />
    </div>
  );
};

export default MessagesPage;
