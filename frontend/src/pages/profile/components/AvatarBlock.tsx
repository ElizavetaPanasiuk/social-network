import { Avatar, Box } from "@/ui-kit";
import styles from "./styles.module.scss";

type AvatarBlockProps = {
  avatar: string;
  firstName: string;
  lastName: string;
};

const AvatarBlock = ({ avatar, firstName, lastName }: AvatarBlockProps) => {
  return (
    <Box className={styles.avatarBlock}>
      <Avatar src={avatar} alt={`${firstName} ${lastName}`} size="large" />
    </Box>
  );
};

export default AvatarBlock;
