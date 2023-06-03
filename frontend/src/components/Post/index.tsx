import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from '@/ui-kit';

import PostEdit from './PostEdit';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import styles from './styles.module.scss';

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
        <PostHeader
          id={id}
          userId={userId}
          firstName={firstName}
          lastName={lastName}
          createdAt={createdAt}
          onDelete={onDelete}
          setEditMode={setEditMode}
        />
        {editMode ? (
          <PostEdit
            postContent={text}
            onSave={saveEditedPost}
            loading={loading}
          />
        ) : (
          <p className={styles.postContent}>{text}</p>
        )}
        <PostFooter
          id={id}
          likes={likes}
          liked={liked}
          like={like}
          dislike={dislike}
          comments={comments}
        />
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
