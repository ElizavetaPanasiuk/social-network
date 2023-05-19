import styles from './styles.module.scss';
import { useState } from 'react';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'password';
  onEnter?: () => void;
  className?: string;
  valid?: boolean;
};

const Input = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  onEnter = () => {},
  className = '',
  valid = true,
}: InputProps) => {
  const [validationActive, setValidationActive] = useState(false);

  return (
    <input
      className={`${styles.input} ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          onEnter();
        }
      }}
      data-invalid={validationActive && !valid}
      onBlur={() => setValidationActive(true)}
    />
  );
};

export default Input;
