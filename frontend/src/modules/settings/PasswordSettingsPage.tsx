import { Form } from '@/components';
import { useForm, useMutation } from '@/hooks';
import { Input, SubmitButton } from '@/ui-kit';
import { useTranslation } from 'react-i18next';
import FIELDS_LENGTH from '@/lib/constants/fields-length';
import { ProfileService } from '@/lib/service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { signOut } from '@/store/userSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const PasswordSettingsPage = () => {
  const { t } = useTranslation();
  const profileService = new ProfileService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.id);
  const { formData, onChange, isValid, resetForm } = useForm({
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

  const { mutate: onSubmit, loading } = useMutation(
    () =>
      profileService.updatePassword(userId as number, {
        password: formData.password.value,
      }),
    {
      onSuccess: () => {
        resetForm();
        dispatch(signOut());
        Cookies.remove('token');
        navigate('/login');
      },
    },
  );

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
        disabled={!isValid || loading}
      />
    </Form>
  );
};

export default PasswordSettingsPage;
