import styles from "./styles.module.scss";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password";
};

const Input = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
}: InputProps) => {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
    />
  );
};

export default Input;
