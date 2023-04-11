import styles from './styles.module.scss';

type ButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
};

const Button = ({ title, onClick, disabled = false }: ButtonProps) => {
  return (
    <button className={styles.button} type="button" onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
