import { useTranslation } from 'react-i18next';

import { SubmitButton } from '@/ui-kit';

type Step4Props = {
  onChange: (key: 'avatar', value: string | File) => void;
  isFormDataValid: boolean;
  loading: boolean;
};

const Step4 = ({ onChange, isFormDataValid, loading }: Step4Props) => {
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
        disabled={!isFormDataValid || loading}
      />
    </>
  );
};

export default Step4;
