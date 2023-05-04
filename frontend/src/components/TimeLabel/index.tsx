import moment from 'moment';
import styles from './styles.module.scss';

type TimeLabelProps = {
  date: string;
};

const TimeLabel = ({ date }: TimeLabelProps) => {
  return <span className={styles.timeLabel}>{moment(date).fromNow()}</span>;
};

export default TimeLabel;
