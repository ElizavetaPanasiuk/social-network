import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.scss";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const IconType = {
  edit: faPencilAlt,
  remove: faTrashAlt,
};

type IconButtonProps = {
  icon: keyof typeof IconType;
  onClick: () => void;
};

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <button type="button" className={styles.iconButton} onClick={onClick}>
      <FontAwesomeIcon icon={IconType[icon]} size="1x" />
    </button>
  );
};

export default IconButton;
