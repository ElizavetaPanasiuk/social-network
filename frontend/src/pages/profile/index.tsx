import { useSelector } from "react-redux";
import { Box } from "@/ui-kit";
import styles from "./styles.module.scss";
import { RootState } from "@/store";

const ProfilePage = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  console.log("USERID:", userId);
  return (
    <div className={styles.profileContainer}>
      <div>
        <Box>avatar</Box>
        <Box>profile data</Box>
      </div>
      <div>
        <Box>friends</Box>
        <Box>Posts</Box>
      </div>
    </div>
  );
};

export default ProfilePage;
