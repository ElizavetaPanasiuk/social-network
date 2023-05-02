import { useTranslation } from 'react-i18next';
import { Button, Input, Select } from '@/ui-kit';
import { RegistrationData } from '../types/registrationData';

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
        value={registrationData.firstName}
        onChange={(value) => onChange('firstName', value)}
        placeholder={t('Name') as string}
      />
      <Input
        value={registrationData.lastName}
        onChange={(value) => onChange('lastName', value)}
        placeholder={t('Surname') as string}
      />
      <Input
        value={registrationData.dateOfBirth}
        onChange={(value) => onChange('dateOfBirth', value)}
        placeholder={t('Birthday') as string}
      />
      <Select
        value={registrationData.country}
        onChange={(value) => onChange('country', value)}
        label={t('Country')}
        options={[
          { label: 'Belarus', value: 'Belarus' },
          { label: 'Польша', value: 'Польша' },
        ]}
      />
      <Select
        value={registrationData.city}
        onChange={(value) => onChange('city', value)}
        label={t('City')}
        options={[
          { label: 'Minsk', value: 'Minsk' },
          { label: 'Brest', value: 'Brest' },
        ]}
      />
      <Button
        title={t('Continue')}
        onClick={onContinue}
      />
    </>
  );
};

export default Step3;
