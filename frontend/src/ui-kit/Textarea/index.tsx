import styles from "./styles.module.scss";

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const Textarea = ({ value, onChange, placeholder = "" }: TextareaProps) => {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={5}
    />
  );
};

export default Textarea;
