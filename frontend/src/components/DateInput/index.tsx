import { useTranslation } from 'react-i18next';

import { Select } from '@/ui-kit';
import { DateObj } from '@/lib/global/types';

import styles from './styles.module.scss';

type DateInputProps = {
  value: DateObj;
  onChange: (value: DateObj) => void;
};

const DateInput = ({ value: { year, month, date }, onChange }: DateInputProps) => {
  const { t } = useTranslation();

  const onChangeYear = (value: DateObj['year']) => {
    onChange({ year: value, month: null, date: null });
  };

  const onChangeMonth = (value: DateObj['month']) => {
    onChange({ year, month: value, date: null });
  };

  const onChangeDate = (value: DateObj['date']) => {
    onChange({ year, month, date: value });
  };

  const months = [
    t('January'),
    t('February'),
    t('Match'),
    t('April'),
    t('May'),
    t('June'),
    t('July'),
    t('August'),
    t('September'),
    t('October'),
    t('November'),
    t('December'),
  ];

  const getMonthDaysCount = (year: DateObj['year'], monthId: DateObj['month']): number => {
    if (year && monthId) {
      return new Date(year, monthId + 1, 0).getDate();
    }
    return 0;
  };

  return (
    <div className={styles.dateInput}>
      <Select<DateObj['year']>
        value={year}
        label={t('Year')}
        onChange={onChangeYear}
        options={Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => ({
          label: year.toString(),
          value: year,
        }))}
      />
      <Select<DateObj['month']>
        value={month}
        label={t('Month')}
        onChange={onChangeMonth}
        options={months.map((month, id) => ({
          label: month,
          value: id,
        }))}
      />
      <Select<DateObj['date']>
        value={date}
        label={t('Date')}
        onChange={onChangeDate}
        options={Array.from({ length: getMonthDaysCount(year, month) }, (_, i) => i + 1).map((date) => ({
          label: date.toString(),
          value: date,
        }))}
      />
    </div>
  );
};

export default DateInput;
