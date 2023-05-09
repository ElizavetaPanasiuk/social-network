import styles from './styles.module.scss';

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onEnter?: () => void;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
};

const Textarea = ({
  value,
  onChange,
  placeholder = '',
  onEnter = () => {},
  disabled = false,
  minLength = 0,
  maxLength,
}: TextareaProps) => {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={5}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          onEnter();
        }
      }}
      disabled={disabled}
      minLength={minLength}
      maxLength={maxLength}
    />
  );
};

export default Textarea;
