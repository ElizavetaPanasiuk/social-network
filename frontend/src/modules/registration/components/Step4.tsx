import { useTranslation } from 'react-i18next';

import { Avatar, SubmitButton } from '@/ui-kit';
import { FormData, Profile } from '@/lib/global/types';

type Step4Form = FormData<Pick<Profile<File | null>, 'avatar'>>;

type Step4Props = {
  onChange: (key: keyof Step4Form, value: File) => void;
  registrationData: Step4Form;
  isFormDataValid: boolean;
  loading: boolean;
};

const Step4 = ({ onChange, registrationData, isFormDataValid, loading }: Step4Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Avatar
        src={
          typeof registrationData.avatar.value === 'string'
            ? registrationData.avatar.value
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLRRlnHwl0Fjl-hOIrc6ZAS8BgFgbzbYPpg&usqp=CAU'
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
};

export default Step4;
