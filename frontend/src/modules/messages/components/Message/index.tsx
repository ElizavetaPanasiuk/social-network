import { Avatar } from '@/ui-kit';
import styles from './styles.module.scss';

type MessageProps = {
  text: string;
  user: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
};

const Message = ({ text, user: { firstName, lastName, avatar } }: MessageProps) => {
  return (
    <article className={styles.message}>
      <Avatar
        src={avatar}
        alt={`${firstName} ${lastName}`}
        size="small"
      />
      <div>
        <h5>{firstName}</h5>
        <p>{text}</p>
      </div>
    </article>
  );
};

export default Message;
