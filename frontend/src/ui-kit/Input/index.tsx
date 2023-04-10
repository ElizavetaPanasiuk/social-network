import styles from './styles.module.scss';

type InputProps = {
  placeholder: string;
  value: string;
};

const Input = ({ value, placeholder = '' }: InputProps) => {
  return <input value={value} placeholder={placeholder} className={styles.input} />;
};

export default Input;
