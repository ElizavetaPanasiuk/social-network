import styles from "./styles.module.scss";

type ButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "contained" | "outlined";
};

const Button = ({
  title,
  onClick,
  disabled = false,
  variant = "contained",
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
