import { useTranslation } from 'react-i18next';
import { Select } from '@/ui-kit';
import styles from './styles.module.scss';

type DateObj = {
  year: number;
  month: number;
  date: number;
};

type DateInputProps = {
  value: DateObj;
  onChange: (value: DateObj) => void;
};

const DateInput = ({ value: { year, month, date }, onChange }: DateInputProps) => {
  const { t } = useTranslation();

  const onChangeYear = (value: number) => {
    onChange({ year: value, month: null, date: null });
  };

  const onChangeMonth = (value: number) => {
    onChange({ year, month: value, date: null });
  };

  const onChangeDate = (value: number) => {
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

  const getMonthDaysCount = (year, monthId: number): number => {
    return new Date(year, monthId + 1, 0).getDate();
  };

  return (
    <div className={styles.dateInput}>
      <Select
        value={year}
        label={t('Year')}
        onChange={onChangeYear}
        options={Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => ({
          label: year,
          value: year,
        }))}
      />
      <Select
        value={month}
        label={t('Month')}
        onChange={onChangeMonth}
        options={months.map((month, id) => ({
          label: month,
          value: id,
        }))}
      />
      <Select
        value={date}
        label={t('Date')}
        onChange={onChangeDate}
        options={Array.from({ length: getMonthDaysCount(year, month) }, (_, i) => i + 1).map((date) => ({
          label: date,
          value: date,
        }))}
      />
    </div>
  );
};

export default DateInput;