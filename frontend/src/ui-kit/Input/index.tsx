import { useState } from 'react';

import styles from './styles.module.scss';

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string | null;
  type?: 'text' | 'password' | 'email';
  onEnter?: () => void;
  className?: string;
  valid?: boolean;
  prompt?: string | null;
};

const Input = ({
  value,
  onChange,
  onEnter,
  placeholder = '',
  type = 'text',
  className = '',
  valid = true,
  prompt = '',
}: InputProps) => {
  const [validationActive, setValidationActive] = useState(false);

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder as string}
        type={type}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && onEnter) {
            onEnter();
          }
        }}
        data-invalid={validationActive && !valid}
        data-prompt={prompt && validationActive && !valid}
        onBlur={() => setValidationActive(true)}
      />
      {prompt && validationActive && !valid && <span className={styles.prompt}>{prompt}</span>}
    </div>
  );
};

export default Input;
