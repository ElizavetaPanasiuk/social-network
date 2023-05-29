import { useTranslation } from 'react-i18next';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import FIELDS_LENGTH from '@/lib/constants/fields-length';
import { IconButton, Textarea } from '@/ui-kit';

import styles from './styles.module.scss';

type MessageInputProps = {
  message: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

const MessageInput = ({ message, onChange, onSend }: MessageInputProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.messageInput}>
      <Textarea
        value={message}
        onChange={onChange}
        placeholder={t('Write a message') as string}
        onEnter={onSend}
        maxLength={FIELDS_LENGTH.MESSAGE_TEXT.MAX}
      />
      <IconButton
        icon={faPaperPlane}
        onClick={onSend}
        className={styles.sendButton}
        disabled={!message.trim()}
      />
    </div>
  );
};

export default MessageInput;
