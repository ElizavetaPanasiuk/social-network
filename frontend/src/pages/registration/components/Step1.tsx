import { Button, Input } from '@/ui-kit';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Step1Props = {
  onContinue: () => void;
};

const Step1 = ({ onContinue }: Step1Props) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  return (
    <>
      <h2>{t('Enter email')}</h2>
      <p>{t('Your email will be used to login')}</p>
      <Input value={email} onChange={setEmail} placeholder={t('Email') as string} />
      <Button title={t('Continue')} onClick={onContinue} />
    </>
  );
};

export default Step1;
