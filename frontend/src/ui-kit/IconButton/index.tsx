import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import styles from './styles.module.scss';

type IconButtonProps = {
  icon: IconDefinition;
  onClick: () => void;
  text?: string;
  className?: string;
  disabled?: boolean;
};

const IconButton = ({ icon, onClick, text = '', className = '', disabled = false }: IconButtonProps) => {
  return (
    <button
      type="button"
      className={`${styles.iconButton} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      }}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={icon} />
      {text ? <span>{text}</span> : null}
    </button>
  );
};

export default IconButton;
