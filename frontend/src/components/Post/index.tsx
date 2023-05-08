import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { Avatar, IconButton } from '@/ui-kit';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import Like from './Like';
import TimeLabel from '../TimeLabel';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import ActionsMenu from './ActionsMenu';
import { useState } from 'react';

type PostProps = {
  id: number;
  text: string;
  likes: number;
  comments: number;
  liked: boolean;
  userId: number;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
  like: (id: number) => void;
  dislike: (id: number) => void;
  onDelete: (id: number) => void;
};

const Post = ({
  id,
  text,
  likes,
  comments,
  liked,
  userId,
  createdAt,
  user: { firstName, lastName, avatar },
  like,
  dislike,
  onDelete,
}: PostProps) => {
  const [actionsMenuVisible, setActionsMenuVisible] = useState(false);

  return (
    <Link
      to={`/post/${id}`}
      className={styles.post}
    >
      <Avatar
        src={avatar}
        size="small"
        alt="post"
      />
      <div className={styles.postContent}>
        <p className={styles.postHeader}>
          <Link
            to={`/profile/${userId}`}
            className={styles.name}
          >
            {firstName} {lastName}
          </Link>
          <TimeLabel date={createdAt} />
          <IconButton
            icon={faEllipsisH}
            onClick={() => setActionsMenuVisible(!actionsMenuVisible)}
            className={styles.postActionsButton}
          />
          {actionsMenuVisible && (
            <ActionsMenu
              onDelete={onDelete}
              setActionsMenuVisible={setActionsMenuVisible}
            />
          )}
        </p>
        <p className={styles.postContent}>{text}</p>
        <div className={styles.postFooter}>
          <Like
            likes={likes}
            liked={liked}
            like={() => like(id)}
            dislike={() => dislike(id)}
          />
          <div className={styles.comment}>
            <IconButton
              icon={faCommentAlt}
              onClick={() => console.log('comment')}
            />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
