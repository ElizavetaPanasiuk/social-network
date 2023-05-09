import { Link } from 'react-router-dom';
import { Avatar } from '@/ui-kit';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type ConversationRowProps = {
  id: string;
  user1: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  user2: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
  };
};

const ConversationRow = ({ id, user1, user2 }: ConversationRowProps) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const user = user1.id === userId ? user2 : user1;
  const { avatar, firstName, lastName } = user;

  return (
    <Link
      to={`./${id}`}
      className={styles.conversationRow}
    >
      <Avatar
        src={avatar}
        alt={`${firstName} ${lastName}`}
      />
      <h4>
        {firstName} {lastName}
      </h4>
    </Link>
  );
};

export default ConversationRow;
