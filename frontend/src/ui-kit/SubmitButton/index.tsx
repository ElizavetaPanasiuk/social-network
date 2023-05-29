import styles from '../Button/styles.module.scss';

type SubmitButtonProps = {
  title: string;
  disabled?: boolean;
  variant?: 'contained' | 'outlined';
  size?: 'small' | 'large';
};

const SubmitButton = ({ title, disabled = false, variant = 'contained', size = 'large' }: SubmitButtonProps) => (
  <button
    className={`${styles.button} ${styles[variant]} ${styles[size]}`}
    type="submit"
    disabled={disabled}
  >
    {title}
  </button>
);

export default SubmitButton;
