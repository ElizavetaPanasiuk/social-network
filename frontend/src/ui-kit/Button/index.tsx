import styles from './styles.module.scss';

type ButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'contained' | 'outlined';
  size?: 'small' | 'large';
};

const Button = ({ title, onClick, disabled = false, variant = 'contained', size = 'large' }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
