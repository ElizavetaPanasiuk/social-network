import { useState } from 'react';
import { IconButton, Textarea } from '@/ui-kit';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const MessageInput = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  return (
    <div className={styles.messageInput}>
      <Textarea
        value={message}
        onChange={setMessage}
        placeholder={t('Write a message') as string}
      />
      <IconButton
        icon={faPaperPlane}
        onClick={() => console.log('publish')}
        className={styles.sendButton}
      />
    </div>
  );
};

export default MessageInput;
