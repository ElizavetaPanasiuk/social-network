import { TimeLabel } from '@/components';
import { BasicProfileInfo } from '@/lib/global/types';
import { Avatar } from '@/ui-kit';

import styles from './styles.module.scss';

type MessageProps = {
  text: string;
  createdAt: string;
  user: BasicProfileInfo;
};

const Message = ({ text, createdAt, user: { firstName, lastName, avatar } }: MessageProps) => {
  return (
    <article className={styles.message}>
      <Avatar
        src={avatar}
        alt={`${firstName} ${lastName}`}
        size="small"
      />
      <div>
        <p>
          <span className={styles.messageAuthor}>{firstName}</span>
          <TimeLabel
            date={createdAt}
            format="timeOnly"
          />
        </p>
        <p>{text}</p>
      </div>
    </article>
  );
};

export default Message;
