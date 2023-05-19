import { SubmitButton } from '@/ui-kit';
import { useTranslation } from 'react-i18next';
import { RegistrationData } from '../types/registrationData';

type Step4Props = {
  onChange: (key: keyof RegistrationData, value: string | File) => void;
  isFormDataValid: boolean;
};

const Step4 = ({ onChange, isFormDataValid }: Step4Props) => {
  const { t } = useTranslation();

  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files) {
            onChange('avatar', e.target.files[0]);
          }
        }}
      />
      <SubmitButton
        title={t('Register')}
        disabled={!isFormDataValid}
      />
    </>
  );
};

export default Step4;
