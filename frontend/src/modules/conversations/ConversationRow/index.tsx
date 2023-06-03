import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/store';
import { Avatar } from '@/ui-kit';
import { ProfileMainInfo } from '@/lib/global/types';

import styles from './styles.module.scss';

type ConversationRowProps = {
  id: string;
  user1: ProfileMainInfo;
  user2: ProfileMainInfo;
};

const ConversationRow = ({ id, user1, user2 }: ConversationRowProps) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const interlocutor = user1.id === userId ? user2 : user1;
  const { avatar, firstName, lastName } = interlocutor;

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
