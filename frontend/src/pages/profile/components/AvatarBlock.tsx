import { useSelector } from "react-redux";
import { Avatar, Box, Button } from "@/ui-kit";
import styles from "./styles.module.scss";
import { RootState } from "@/store";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FriendRequestsService } from "../service";

type AvatarBlockProps = {
  avatar: string;
  firstName: string;
  lastName: string;
};

const AvatarBlock = ({ avatar, firstName, lastName }: AvatarBlockProps) => {
  const { t } = useTranslation();
  const userId = useSelector((state: RootState) => state.user.id as number);
  const params = useParams();
  const profileId = Number(params.profileId);
  const friendRequestsService = new FriendRequestsService();

  return (
    <Box className={styles.avatarBlock}>
      <Avatar src={avatar} alt={`${firstName} ${lastName}`} size="large" />
      {userId !== profileId && (
        <Button
          title={t("Add to friends")}
          onClick={() => friendRequestsService.createRequest(userId, profileId)}
        />
      )}
    </Box>
  );
};

export default AvatarBlock;
