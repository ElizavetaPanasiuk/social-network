import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

import { IconButton } from '@/ui-kit';

import styles from './styles.module.scss';

type LikeProps = {
  likes: number;
  liked: boolean;
  like: () => void;
  dislike: () => void;
};

const Like = ({ likes, liked, like, dislike }: LikeProps) => {
  return (
    <div className={`${styles.like} ${liked ? styles.liked : ''}`}>
      <IconButton
        icon={liked ? faHeartSolid : faHeart}
        onClick={liked ? dislike : like}
      />
      <span>{likes}</span>
    </div>
  );
};

export default Like;
