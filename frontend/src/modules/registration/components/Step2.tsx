import { Button, Input } from '@/ui-kit';
import { useTranslation } from 'react-i18next';
import { RegistrationData } from '../types/registrationData';

type Step2Props = {
  onContinue: () => void;
  registrationData: RegistrationData;
  onChange: (key: keyof RegistrationData, value: string) => void;
};

const Step2 = ({ onContinue, registrationData, onChange }: Step2Props) => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('Create a password')}</h2>
      <p>{t('To protect your account, create a strong password')}</p>
      <Input
        value={registrationData.password.value as string}
        valid={registrationData.password.valid}
        onChange={(value) => onChange('password', value)}
        placeholder={t('Enter password') as string}
        type="password"
      />
      <Input
        value={registrationData.passwordRepeat.value as string}
        valid={
          registrationData.passwordRepeat.valid &&
          registrationData.passwordRepeat.value === registrationData.password.value
        }
        onChange={(value) => onChange('passwordRepeat', value)}
        placeholder={t('Confirm password') as string}
        type="password"
      />
      <Button
        title={t('Continue')}
        onClick={onContinue}
        disabled={
          !(
            registrationData.password.valid &&
            registrationData.passwordRepeat.valid &&
            registrationData.password.value === registrationData.passwordRepeat.value
          )
        }
      />
    </>
  );
};

export default Step2;
