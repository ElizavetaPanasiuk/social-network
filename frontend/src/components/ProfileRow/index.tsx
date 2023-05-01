import { Link } from "react-router-dom";
import { Avatar } from "@/ui-kit";
import styles from "./styles.module.scss";

type ProfileRowProps = {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
};

const ProfileRow = ({ id, firstName, lastName, avatar }: ProfileRowProps) => {
  return (
    <Link to={`/profile/${id}`} className={styles.profileRow}>
      <Avatar size="medium" src={avatar} alt={`${firstName} ${lastName}`} />
      <h4>
        {firstName} {lastName}
      </h4>
    </Link>
  );
};

export default ProfileRow;
