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
  likesCount: number;
  commentsCount: number;
  liked: boolean;
  author: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
};

const Post = ({
  id,
  text,
  likesCount,
  commentsCount,
  liked = false, // TODO: Add to request
  author: { firstName, lastName, avatar },
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
              onClick={() => console.log("like")}
            />
            <span>{likesCount}</span>
          </div>
          <div className={styles.comment}>
            <IconButton
              icon={liked ? faCommentAltSolid : faCommentAlt}
              onClick={() => console.log("comment")}
            />
            <span>{commentsCount}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
