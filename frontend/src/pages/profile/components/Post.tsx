import { Avatar, Box } from "@/ui-kit";
import { Post as PostType } from "../types";
import styles from "./styles.module.scss";

const Post = ({ firstName, lastName, avatar, text, createdAt }: PostType) => {
  return (
    <Box className={styles.post}>
      <div className={styles.header}>
        <Avatar src={avatar} alt={`${firstName} ${lastName}`} />
        <div>
          <h4>
            {firstName} {lastName}
          </h4>
          <p>
            {createdAt.getFullYear()}-{createdAt.getMonth() + 1}-
            {createdAt.getDate()}
          </p>
        </div>
      </div>
      <p>{text}</p>
    </Box>
  );
};

export default Post;
