import { Avatar } from '@/ui-kit';
import styles from './styles.module.scss';
import { TimeLabel } from '@/components';

type MessageProps = {
  text: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
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
          {firstName}
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