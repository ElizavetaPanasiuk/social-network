import styles from './styles.module.scss';

type ButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'contained' | 'outlined';
  size?: 'small' | 'large';
};

const Button = ({ title, onClick, disabled = false, variant = 'contained', size = 'large' }: ButtonProps) => (
  <button
    className={styles.button}
    onClick={onClick}
    disabled={disabled}
    data-size={size}
    data-variant={variant}
  >
    {title}
  </button>
);

export default Button;
