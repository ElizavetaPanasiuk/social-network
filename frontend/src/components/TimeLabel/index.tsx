import moment from 'moment';

import styles from './styles.module.scss';

type TimeLabelProps = {
  date: string;
  format?: 'fromNow' | 'timeOnly';
};

const TimeLabel = ({ date, format = 'fromNow' }: TimeLabelProps) => {
  const timeFormatted = format === 'timeOnly' ? moment(date).format('hh:mm a') : moment(date).fromNow();

  return <span className={styles.timeLabel}>{timeFormatted}</span>;
};

export default TimeLabel;
