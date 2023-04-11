import { useState } from 'react';
import { Button, Input } from '@/ui-kit';
import { useTranslation } from 'react-i18next';

type Step2Props = {
  onContinue: () => void;
};

const Step2 = ({ onContinue }: Step2Props) => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  return (
    <>
      <h2>{t('Create a password')}</h2>
      <p>{t('To protect your account, create a strong password')}</p>
      <Input value={password} onChange={setPassword} placeholder={t('Enter password') as string} type="password" />
      <Input
        value={passwordRepeat}
        onChange={setPasswordRepeat}
        placeholder={t('Confirm password') as string}
        type="password"
      />
      <Button title={t('Continue')} onClick={onContinue} />
    </>
  );
};

export default Step2;
