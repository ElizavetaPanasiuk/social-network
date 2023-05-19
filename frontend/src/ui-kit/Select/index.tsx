import { useState } from 'react';
import styles from './styles.module.scss';

type SelectOption = string | number;
type SelectValue = SelectOption & null;

type SelectProps = {
  label: string;
  options: {
    label: string | number;
    value: SelectOption;
  }[];
  value: SelectValue;
  onChange: (value: SelectOption) => void;
  disabled?: boolean;
  className?: string;
};

const Select = ({ label, options, value, onChange, disabled = false, className = '' }: SelectProps) => {
  const [visible, setVisible] = useState(false);

  const onSelect = (value: SelectOption) => {
    onChange(value);
    setVisible(false);
  };

  return (
    <div className={`${styles.selectContainer} ${className}`}>
      <button
        type="button"
        className={`${styles.select} ${visible ? styles.active : ''}`}
        onClick={() => setVisible(!visible)}
        disabled={disabled}
      >
        {options.find((el) => el.value === value)?.label || label}
      </button>
      {visible && (
        <div className={styles.options}>
          {options.map((el) => (
            <button
              type="button"
              key={el.value}
              onClick={() => onSelect(el.value)}
              className={styles.option}
            >
              {el.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
