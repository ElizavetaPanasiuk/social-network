import styles from './styles.module.scss';

type EmptyListMessageProps = {
  text: string;
};

const EmptyListMessage = ({ text }: EmptyListMessageProps) => (
  <div className={styles.emptyListMessage}>
    <p>{text}</p>
  </div>
);

export default EmptyListMessage;
