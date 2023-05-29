import { Fragment, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useChat, useQuery } from '@/hooks';
import { MessagesService } from '@/lib/service';
import { BasicProfileInfo, MessageType } from '@/lib/global/types';
import { Loader } from '@/ui-kit';

import { Message, MessageInput, MessagesHeader } from './components';
import styles from './styles.module.scss';

const MessagesPage = () => {
  const messagesService = new MessagesService();
  const { roomId } = useParams();
  const {
    messages,
    loading,
    chatActions,
  }: {
    messages: MessageType[];
    loading: boolean;
    chatActions: {
      send: (text: string) => void;
    };
  } = useChat();
  const { data: user, loading: loadingUser }: { data: BasicProfileInfo; loading: boolean } = useQuery(() =>
    messagesService.getInterlocutor(roomId as string),
  );

  const [text, setText] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const sendMessage = () => {
    if (text.trim()) {
      chatActions.send(text);
      setText('');
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
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
            {messages.map((message, id) => (
              <Fragment key={message.id}>
                {(id === 0 ||
                  moment(message.createdAt).format('DD.MM.YYYY') !==
                    moment(messages[id - 1].createdAt).format('DD.MM.YYYY')) && (
                  <div className={styles.dateHeader}>{moment(message.createdAt).format('LL')}</div>
                )}
                <Message {...message} />
              </Fragment>
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
