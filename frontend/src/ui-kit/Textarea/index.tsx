import styles from './styles.module.scss';

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onEnter?: () => void;
};

const Textarea = ({ value, onChange, placeholder = '', onEnter = () => {} }: TextareaProps) => {
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
    />
  );
};

export default Textarea;
