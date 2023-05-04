import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.scss';

type IconButtonProps = {
  icon: IconDefinition;
  onClick: () => void;
  text?: string;
  className?: string;
};

const IconButton = ({ icon, onClick, text = '', className = '' }: IconButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.iconButton} ${className}`}
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
