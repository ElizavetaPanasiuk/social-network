import { Avatar } from "@/ui-kit";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactNode } from "react";

type ProfileRowProps = {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: string;
  children: ReactNode;
};

const ProfileRow = ({
  id,
  firstName,
  lastName,
  avatar = "https://avatars.mds.yandex.net/i?id=bb951d00a0cb85705e3fb55d825cb1340a0a6b18-8498443-images-thumbs&n=13",
  children,
}: ProfileRowProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.profileCard}>
      <Avatar src={avatar} alt={`${firstName} ${lastName}`} size="large" />
      <div>
        <h4>
          <Link to={`/profile/${id}`}>
            {firstName} {lastName}
          </Link>
        </h4>
        {children}
      </div>
    </div>
  );
};

export default ProfileRow;