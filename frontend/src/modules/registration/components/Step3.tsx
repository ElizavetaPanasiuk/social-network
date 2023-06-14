import { useTranslation } from 'react-i18next';

import { DateInput } from '@/components';
import { locations } from '@/lib/constants/country-city';
import { DateObj, FormData, Profile } from '@/lib/global/types';
import { Button, Input, Select } from '@/ui-kit';

import styles from './styles.module.scss';

type Step3Form = FormData<
  Pick<Profile<null>, 'firstName' | 'lastName' | 'country' | 'city'> & { dateOfBirth: DateObj }
>;

type Step3Props = {
  onContinue: () => void;
  registrationData: Step3Form;
  onChange: (key: keyof Step3Form, value: string | DateObj) => void;
};

const Step3 = ({ onContinue, registrationData, onChange }: Step3Props) => {
  const { t } = useTranslation();
  const dateOfBirth = registrationData.dateOfBirth.value;

  return (
    <>
      <h2>{t('Personal information')}</h2>
      <Input
        value={registrationData.firstName.value}
        valid={registrationData.firstName.valid}
        onChange={(value) => onChange('firstName', value)}
        placeholder={t('Name')}
      />
      <Input
        value={registrationData.lastName.value}
        valid={registrationData.lastName.valid}
        onChange={(value) => onChange('lastName', value)}
        placeholder={t('Surname')}
      />
      <p>{t('Birthday')}</p>
      <DateInput
        value={registrationData.dateOfBirth.value}
        onChange={(value) => onChange('dateOfBirth', value)}
      />
      <Select
        value={registrationData.country.value}
        onChange={(value) => onChange('country', value)}
        label={t('Country')}
        options={Object.keys(locations).map((country) => ({ label: country, value: country }))}
        className={styles.locationSelect}
      />
      <Select
        value={registrationData.city.value}
        onChange={(value) => onChange('city', value)}
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
};

export default Step3;
