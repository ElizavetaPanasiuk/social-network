import styles from './styles.module.scss';

type SymbolCounterProps = {
  value: string;
  max: number;
};

const SymbolCounter = ({ value, max }: SymbolCounterProps) => {
  return (
    <span className={styles.symbolCounter}>
      {value.length} / {max}
    </span>
  );
};

export default SymbolCounter;