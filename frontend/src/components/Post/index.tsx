import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { Avatar, IconButton } from "@/ui-kit";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import Like from "./Like";

type PostProps = {
  id: number;
  text: string;
  likes: number;
  comments: number;
  liked: boolean;
  authorId: number;
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
  liked,
  authorId,
  author: { firstName, lastName, avatar },
  like,
  dislike,
}: PostProps) => {
  console.log("Post");
  return (
    <Link to={`/post/${id}`} className={styles.post}>
      <Avatar src={avatar} size="small" alt="post" />
      <div className={styles.postContent}>
        <p className={styles.postHeader}>
          <Link to={`/profile/${authorId}`} className={styles.name}>
            {firstName} {lastName}
          </Link>
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
              onClick={() => console.log("comment")}
            />
            <span>{comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Post;
