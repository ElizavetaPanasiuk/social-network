import { Button, Input } from '@/ui-kit';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FormData } from '@/lib/global/types';

type Step1Props<T> = {
  onContinue: () => void;
  registrationData: FormData<T>;
  onChange: (key: keyof FormData<T>, value: string) => void;
};

function Step1<T>({ onContinue, registrationData, onChange }: Step1Props<T>) {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('Enter email')}</h2>
      <p>{t('Your email will be used to login')}</p>
      <Input
        value={registrationData.email.value as string}
        valid={registrationData.email.valid}
        onChange={(value) => onChange('email', value)}
        placeholder={t('Email') as string}
      />
      <Button
        title={t('Continue')}
        onClick={onContinue}
        disabled={!registrationData.email.valid}
      />
      <Link to="/login">{t('Or Sign In')}</Link>
    </>
  );
}

export default Step1;
