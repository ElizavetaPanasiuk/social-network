import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { Avatar, IconButton, Textarea } from '@/ui-kit';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import Like from './Like';
import TimeLabel from '../TimeLabel';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import ActionsMenu from './ActionsMenu';
import { useState } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import PostEdit from './PostEdit';

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
  loading?: boolean;
  dislike: (id: number) => void;
  onDelete?: (id: number) => void;
  onUpdate?: (id: number, newContent: string) => void;
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
  loading = false,
  onDelete = () => {},
  onUpdate = () => {},
}: PostProps) => {
  const currentUserId = useSelector((state: RootState) => state.user.id);
  const navigate = useNavigate();
  const [actionsMenuVisible, setActionsMenuVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const saveEditedPost = async (newPostContent: string) => {
    await onUpdate(id, newPostContent);
    setEditMode(false);
  };

  const innerContent = (
    <>
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
        {editMode ? (
          <PostEdit
            postContent={text}
            onSave={saveEditedPost}
            loading={loading}
          />
        ) : (
          <p className={styles.postContent}>{text}</p>
        )}
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
              onClick={() => navigate(`/post/${id}`)}
            />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </>
  );

  return editMode ? (
    <div className={styles.post}>{innerContent}</div>
  ) : (
    <Link
      to={`/post/${id}`}
      className={`${styles.post} ${styles.link}`}
    >
      {innerContent}
    </Link>
  );
};

export default Post;
