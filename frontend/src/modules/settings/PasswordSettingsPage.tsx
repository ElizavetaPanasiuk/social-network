import { Form } from '@/components';
import { useForm } from '@/hooks';
import { Input, SubmitButton } from '@/ui-kit';
import { useTranslation } from 'react-i18next';
import FIELDS_LENGTH from '@/lib/constants/fields-length';

const PasswordSettingsPage = () => {
  const { t } = useTranslation();
  const { formData, onChange, isValid } = useForm({
    password: {
      value: '',
      minLength: FIELDS_LENGTH.PASSWORD.MIN,
      maxLength: FIELDS_LENGTH.PASSWORD.MAX,
    },
    passwordRepeat: {
      value: '',
      minLength: FIELDS_LENGTH.PASSWORD.MIN,
      maxLength: FIELDS_LENGTH.PASSWORD.MAX,
    },
  });
  const onSubmit = () => console.log('submit');

  return (
    <Form onSubmit={onSubmit}>
      <Input
        value={formData.password.value as string}
        valid={formData.password.valid}
        onChange={(value) => onChange('password', value)}
        placeholder={t('Enter password') as string}
        type="password"
      />
      <Input
        value={formData.passwordRepeat.value as string}
        valid={formData.passwordRepeat.valid && formData.passwordRepeat.value === formData.password.value}
        onChange={(value) => onChange('passwordRepeat', value)}
        placeholder={t('Confirm password') as string}
        type="password"
      />
      <SubmitButton
        title={t('Save')}
        disabled={!isValid}
      />
    </Form>
  );
};

export default PasswordSettingsPage;
