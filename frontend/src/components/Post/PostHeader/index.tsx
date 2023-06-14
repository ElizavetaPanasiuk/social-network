import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import { RootState } from '@/store';
import TimeLabel from '@/components/TimeLabel';
import { IconButton } from '@/ui-kit';

import ActionsMenu from '../ActionsMenu';
import styles from './styles.module.scss';

type PostHeaderProps = {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  onDelete: (id: number) => void;
  setEditMode: (value: boolean) => void;
};

const PostHeader = ({ id, userId, firstName, lastName, createdAt, onDelete, setEditMode }: PostHeaderProps) => {
  const currentUserId = useSelector((state: RootState) => state.user.id);
  const [actionsMenuVisible, setActionsMenuVisible] = useState(false);

  return (
    <p className={styles.postHeader}>
      <Link
        to={`/profile/${userId}`}
        className={styles.name}
      >
        {firstName} {lastName}
      </Link>
      <TimeLabel date={createdAt} />
      {currentUserId === +userId && (
        <>
          <IconButton
            icon={faEllipsisH}
            onClick={() => setActionsMenuVisible(!actionsMenuVisible)}
            className={styles.postActionsButton}
          />
          {actionsMenuVisible && (
            <ActionsMenu
              onDelete={() => onDelete(id)}
              onEdit={() => setEditMode(true)}
              setActionsMenuVisible={setActionsMenuVisible}
            />
          )}
        </>
      )}
    </p>
  );
};

export default PostHeader;
