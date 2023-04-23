import styles from "./styles.module.scss";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password";
  onEnter?: () => void;
};

const Input = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  onEnter = () => {},
}: InputProps) => {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          onEnter();
        }
      }}
    />
  );
};

export default Input;
