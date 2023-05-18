import { useTranslation } from 'react-i18next';
import { Button, Input, Select } from '@/ui-kit';
import { RegistrationData } from '../types/registrationData';
import { DateInput } from '@/components';
import { locations } from '@/lib/constants/country-city';
import styles from './styles.module.scss';

type Step3Props = {
  onContinue: () => void;
  registrationData: RegistrationData;
  onChange: (key: keyof RegistrationData, value: string) => void;
};

const Step3 = ({ onContinue, registrationData, onChange }: Step3Props) => {
  const { t } = useTranslation();

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
        value={registrationData.dateOfBirth}
        onChange={(value) => onChange('dateOfBirth', value)}
      />
      <Select
        value={registrationData.country.value as string}
        onChange={(value) => onChange('country', value as string)}
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
          (registrationData.country.value as string)
            ? locations[registrationData.country.value].map((city) => ({ label: city, value: city }))
            : []
        }
        className={styles.locationSelect}
      />
      <Button
        title={t('Continue')}
        onClick={onContinue}
      />
    </>
  );
};

export default Step3;
