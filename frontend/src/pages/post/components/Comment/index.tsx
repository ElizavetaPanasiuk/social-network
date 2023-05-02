import { Link } from 'react-router-dom';
import { Like } from '@/components';
import { Avatar } from '@/ui-kit';
import styles from './styles.module.scss';

type CommentProps = {
  id: number;
  text: string;
  likes: number;
  liked: boolean;
  createdAt: string;
  userId: number;
  author: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
  like: (commentId: number) => void;
  dislike: (commentId: number) => void;
};

const Comment = ({
  id,
  text,
  likes,
  liked,
  createdAt,
  userId,
  author: { firstName, lastName, avatar },
  like,
  dislike,
}: CommentProps) => {
  return (
    <article className={styles.comment}>
      <Avatar
        src={avatar}
        alt={`${firstName} ${lastName}`}
      />
      <div className={styles.commentContent}>
        <Link to={`/profile/${userId}`}>
          {firstName} {lastName}
        </Link>
        <p>{text}</p>
        <Like
          likes={likes}
          liked={liked}
          like={() => like(id)}
          dislike={() => dislike(id)}
        />
      </div>
    </article>
  );
};

export default Comment;
