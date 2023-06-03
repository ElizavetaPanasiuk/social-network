import { useNavigate } from 'react-router-dom';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';

import { IconButton } from '@/ui-kit';

import Like from '../Like';
import styles from './styles.module.scss';

type PostFooterProps = {
  id: number;
  likes: number;
  liked: boolean;
  like: (id: number) => void;
  dislike: (id: number) => void;
  comments: number;
};

const PostFooter = ({ id, likes, liked, like, dislike, comments }: PostFooterProps) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default PostFooter;
