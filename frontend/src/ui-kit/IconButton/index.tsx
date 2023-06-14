import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

import styles from './styles.module.scss';

type IconButtonProps = {
  icon: IconDefinition;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

const IconButton = ({ icon, onClick, className = '', disabled = false }: IconButtonProps) => (
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
  </button>
);

export default IconButton;
