import { useTranslation } from 'react-i18next';

import { FormData, Profile } from '@/lib/global/types';
import { Button, Input } from '@/ui-kit';

type Step2Form = FormData<Pick<Profile<null>, 'password'> & { passwordRepeat: string }>;

type Step2Props = {
  onContinue: () => void;
  registrationData: Step2Form;
  onChange: (key: keyof Step2Form, value: string) => void;
};

const Step2 = ({ onContinue, registrationData, onChange }: Step2Props) => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('Create a password')}</h2>
      <p>{t('To protect your account, create a strong password')}</p>
      <Input
        value={registrationData.password.value}
        valid={registrationData.password.valid}
        onChange={(value) => onChange('password', value)}
        placeholder={t('Enter password')}
        type="password"
        prompt={t('Password must contain at least 1 uppercase and 1 number. Minimum 8 symbols.')}
      />
      <Input
        value={registrationData.passwordRepeat.value}
        valid={
          registrationData.passwordRepeat.valid &&
          registrationData.passwordRepeat.value === registrationData.password.value
        }
        onChange={(value) => onChange('passwordRepeat', value)}
        placeholder={t('Confirm password')}
        type="password"
        prompt={t('Password must contain at least 1 uppercase and 1 number. Minimum 8 symbols.')}
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
