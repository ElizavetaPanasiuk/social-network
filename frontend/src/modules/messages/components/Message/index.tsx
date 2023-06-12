import { TimeLabel } from '@/components';
import { Profile } from '@/lib/global/types';
import { Avatar } from '@/ui-kit';

import styles from './styles.module.scss';

type MessageProps = {
  text: string;
  createdAt: string;
  user: Pick<Profile<string>, 'avatar' | 'firstName' | 'lastName'>;
};

const Message = ({ text, createdAt, user: { firstName, lastName, avatar } }: MessageProps) => (
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

export default Message;
