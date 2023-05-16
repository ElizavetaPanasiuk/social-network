import { SubmitButton } from '@/ui-kit';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { RegistrationData } from '../types/registrationData';

type Step4Props = {
  onChange: (key: keyof RegistrationData, value: string) => void;
};

const Step4 = ({ onChange }: Step4Props) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLInputElement>();

  return (
    <>
      <input
        type="file"
        ref={ref}
        onChange={(e) => onChange('avatar', e.target.files[0])}
      />
      <SubmitButton title={t('Register')} />
    </>
  );
};

export default Step4;
