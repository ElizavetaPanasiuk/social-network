import { useState } from 'react';
import { Button, Input } from '@/ui-kit';
import { useTranslation } from 'react-i18next';

type Step3Props = {
  onContinue: () => void;
};

const Step3 = ({ onContinue }: Step3Props) => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  return (
    <>
      <h2>{t('Personal information')}</h2>
      <Input value={firstName} onChange={setFirstName} placeholder={t('Name') as string} />
      <Input value={lastName} onChange={setLastName} placeholder={t('Surname') as string} />
      <Input value={dateOfBirth} onChange={setDateOfBirth} placeholder={t('Birthday') as string} />
      <Input value={country} onChange={setCountry} placeholder={t('Country') as string} />
      <Input value={city} onChange={setCity} placeholder={t('City') as string} />
      <Button title={t('Register')} onClick={onContinue} />
    </>
  );
};

export default Step3;
