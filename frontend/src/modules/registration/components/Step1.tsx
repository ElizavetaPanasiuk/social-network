import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { FormData, Profile } from '@/lib/global/types';
import { Button, Input } from '@/ui-kit';

type Step1Form = FormData<Pick<Profile<null>, 'email'>>;

type Step1Props = {
  onContinue: () => void;
  registrationData: Step1Form;
  onChange: (key: keyof Step1Form, value: string) => void;
};

const Step1 = ({ onContinue, registrationData, onChange }: Step1Props) => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('Enter email')}</h2>
      <p>{t('Your email will be used to login')}</p>
      <Input
        value={registrationData.email.value}
        valid={registrationData.email.valid}
        onChange={(value) => onChange('email', value)}
        placeholder={t('Email')}
        type="email"
      />
      <Button
        title={t('Continue')}
        onClick={onContinue}
        disabled={!registrationData.email.valid}
      />
      <Link to="/login">{t('Or Sign In')}</Link>
    </>
  );
};

export default Step1;
