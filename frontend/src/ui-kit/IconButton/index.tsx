import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import styles from "./styles.module.scss";

type IconButtonProps = {
  icon: IconDefinition;
  onClick: () => void;
};

const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return (
    <button type="button" className={styles.iconButton} onClick={onClick}>
      <FontAwesomeIcon icon={icon}/>
    </button>
  );
};

export default IconButton;
