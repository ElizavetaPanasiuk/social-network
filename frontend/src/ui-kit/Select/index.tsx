import { Key, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import styles from './styles.module.scss';

type SelectProps<T> = {
  label: string;
  options: {
    label: T;
    value: T;
  }[];
  value: T;
  onChange: (value: T) => void;
  disabled?: boolean;
  className?: string;
};

function Select<T>({ label, options, value, onChange, disabled = false, className = '' }: SelectProps<T>) {
  const [visible, setVisible] = useState(false);

  const onSelect = (value: T) => {
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
        <span className={styles.selectTitle}>
          {(options.find((el) => el.value === value)?.label as string) || (label as string)}
        </span>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={visible ? styles.selectAngleOpened : ''}
        />
      </button>
      {visible && (
        <div className={styles.options}>
          {options.map((el) => (
            <button
              type="button"
              key={el.value as Key}
              onClick={() => onSelect(el.value)}
              className={styles.option}
            >
              {el.label as string}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
