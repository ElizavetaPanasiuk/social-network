import styles from "./styles.module.scss";
import { Avatar, IconButton } from "@/ui-kit";
import { faHeart, faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import {
  faCommentAlt as faCommentAltSolid,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";

type PostProps = {
  id: number;
  text: string;
  likes: number;
  comments: number;
  liked: boolean;
  author: {
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
  liked = false, // TODO: Add to request
  author: { firstName, lastName, avatar },
  like,
  dislike,
}: PostProps) => {
  return (
    <article className={styles.post}>
      <Avatar src={avatar} size="small" alt="post" />
      <div className={styles.postContent}>
        <p className={styles.postHeader}>
          <span className={styles.name}>
            {firstName} {lastName}
          </span>
        </p>
        <p className={styles.postContent}>{text}</p>
        <div className={styles.postFooter}>
          <div className={styles.like}>
            <IconButton
              icon={liked ? faHeartSolid : faHeart}
              onClick={liked ? () => dislike(id) : () => like(id)}
            />
            <span>{likes}</span>
          </div>
          <div className={styles.comment}>
            <IconButton
              icon={liked ? faCommentAltSolid : faCommentAlt}
              onClick={() => console.log("comment")}
            />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
