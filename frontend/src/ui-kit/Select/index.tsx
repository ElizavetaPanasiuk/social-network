import { useState } from 'react';
import styles from './styles.module.scss';

type SelectProps = {
  label: string;
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (value: string) => void;
};

const Select = ({ label, options, value, onChange }: SelectProps) => {
  const [visible, setVisible] = useState(false);

  const onSelect = (value: string) => {
    onChange(value);
    setVisible(false);
  };

  return (
    <div className={styles.selectContainer}>
      <button
        type="button"
        className={`${styles.select} ${visible ? styles.active : ''}`}
        onClick={() => setVisible(!visible)}
      >
        {value || label}
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
