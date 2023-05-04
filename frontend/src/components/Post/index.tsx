import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { Avatar, IconButton } from '@/ui-kit';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import Like from './Like';
import TimeLabel from '../TimeLabel';

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
}: PostProps) => {
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
