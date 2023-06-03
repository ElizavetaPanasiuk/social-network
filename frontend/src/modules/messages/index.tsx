import { Fragment, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import { useChat, useQuery } from '@/hooks';
import { MessagesService } from '@/lib/service';
import { BasicProfileInfo, MessageType, QueryError } from '@/lib/global/types';
import { PageWrapper } from '@/components';

import { Message, MessageInput, MessagesHeader } from './components';
import styles from './styles.module.scss';

const MessagesPage = () => {
  const { roomId } = useParams();
  const [text, setText] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const messagesService = new MessagesService();

  const {
    messages,
    loading: loadingChat,
    chatActions,
    error: errorChat,
  }: {
    messages: MessageType[];
    loading: boolean;
    chatActions: {
      send: (text: string) => void;
    };
    error: QueryError;
  } = useChat();

  const {
    data: user,
    loading: loadingUser,
    error: errorGetUser,
  }: { data: BasicProfileInfo; loading: boolean; error: QueryError } = useQuery(() =>
    messagesService.getInterlocutor(roomId as string),
  );

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
      <PageWrapper
        loading={loadingChat || loadingUser}
        error={[errorChat, errorGetUser]}
      >
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
      </PageWrapper>
    </div>
  );
};

export default MessagesPage;
