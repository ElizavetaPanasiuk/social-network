import { useTranslation } from 'react-i18next';

import { Avatar, SubmitButton } from '@/ui-kit';
import { FormData } from '@/lib/global/types';

type Step4Props<T> = {
  onChange: (key: 'avatar', value: string | File) => void;
  registrationData: FormData<T>;
  isFormDataValid: boolean;
  loading: boolean;
};

function Step4<T>({ onChange, registrationData, isFormDataValid, loading }: Step4Props<T>) {
  const { t } = useTranslation();

  return (
    <>
      <Avatar
        src={
          (registrationData.avatar.value as string) ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLRRlnHwl0Fjl-hOIrc6ZAS8BgFgbzbYPpg&usqp=CAU'
        }
        alt="Avatar"
        edit
        onChange={onChange}
        size="large"
      />
      <SubmitButton
        title={t('Register')}
        disabled={!isFormDataValid || loading}
      />
    </>
  );
}

export default Step4;
