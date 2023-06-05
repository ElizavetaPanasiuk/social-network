import { useTranslation } from 'react-i18next';

import { DateInput } from '@/components';
import { locations } from '@/lib/constants/country-city';
import { DateObj, FormData } from '@/lib/global/types';
import { Button, Input, Select } from '@/ui-kit';

import styles from './styles.module.scss';

type Step3Props<T> = {
  onContinue: () => void;
  registrationData: FormData<T>;
  onChange: (key: keyof FormData<T>, value: string | DateObj) => void;
};

function Step3<T>({ onContinue, registrationData, onChange }: Step3Props<T>) {
  const { t } = useTranslation();
  const dateOfBirth = registrationData.dateOfBirth.value as DateObj;

  return (
    <>
      <h2>{t('Personal information')}</h2>
      <Input
        value={registrationData.firstName.value as string}
        valid={registrationData.firstName.valid}
        onChange={(value) => onChange('firstName', value)}
        placeholder={t('Name') as string}
      />
      <Input
        value={registrationData.lastName.value as string}
        valid={registrationData.lastName.valid}
        onChange={(value) => onChange('lastName', value)}
        placeholder={t('Surname') as string}
      />
      <p>{t('Birthday')}</p>
      <DateInput
        value={registrationData.dateOfBirth.value as DateObj}
        onChange={(value) => onChange('dateOfBirth', value)}
      />
      <Select
        value={registrationData.country.value as string}
        onChange={(value) => onChange('country', value as keyof typeof locations)}
        label={t('Country')}
        options={Object.keys(locations).map((country) => ({ label: country, value: country }))}
        className={styles.locationSelect}
      />
      <Select
        value={registrationData.city.value as string}
        onChange={(value) => onChange('city', value as string)}
        label={t('City')}
        disabled={!registrationData.country}
        options={
          registrationData.country.value
            ? locations?.[registrationData.country.value as keyof typeof locations].map((city: string) => ({
                label: city,
                value: city,
              }))
            : []
        }
        className={styles.locationSelect}
      />
      <Button
        title={t('Continue')}
        onClick={onContinue}
        disabled={
          !(
            registrationData.firstName.valid &&
            registrationData.lastName.valid &&
            registrationData.country &&
            registrationData.city &&
            dateOfBirth.year &&
            dateOfBirth.month &&
            dateOfBirth.date
          )
        }
      />
    </>
  );
}

export default Step3;
