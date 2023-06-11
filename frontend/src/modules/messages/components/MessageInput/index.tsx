import { useTranslation } from 'react-i18next';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import FIELDS_VALIDATION_RULES from '@/lib/constants/fields-validation-rules';
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
        placeholder={t('Write a message')}
        onEnter={onSend}
        maxLength={FIELDS_VALIDATION_RULES.MESSAGE_TEXT.MAX}
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
