import styles from '../Button/styles.module.scss';

type SubmitButtonProps = {
  title: string;
  disabled?: boolean;
  variant?: 'contained' | 'outlined';
  size?: 'small' | 'large';
};

const SubmitButton = ({ title, disabled = false, variant = 'contained', size = 'large' }: SubmitButtonProps) => (
  <button
    className={styles.button}
    type="submit"
    disabled={disabled}
    data-size={size}
    data-variant={variant}
  >
    {title}
  </button>
);

export default SubmitButton;
