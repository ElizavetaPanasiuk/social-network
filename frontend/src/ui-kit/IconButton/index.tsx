import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.scss';

type IconButtonProps = {
  icon: IconDefinition;
  onClick: () => void;
  text?: string;
};

const IconButton = ({ icon, onClick, text = '' }: IconButtonProps) => {
  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
    >
      <FontAwesomeIcon icon={icon} />
      {text ? <span>{text}</span> : null}
    </button>
  );
};

export default IconButton;
