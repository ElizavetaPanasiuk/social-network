import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

import { Form } from '@/components';
import { useForm, useMutation } from '@/hooks';
import FIELDS_LENGTH from '@/lib/constants/fields-length';
import { ProfileService } from '@/lib/service';
import { RootState } from '@/store';
import { signOut } from '@/store/userSlice';
import { Input, SubmitButton } from '@/ui-kit';

import styles from './styles.module.scss';

const PasswordSettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.id);

  const profileService = new ProfileService();

  const { formData, onChange, isValid, resetForm } = useForm({
    password: {
      value: '',
      minLength: FIELDS_LENGTH.PASSWORD.MIN,
      maxLength: FIELDS_LENGTH.PASSWORD.MAX,
      regexp: FIELDS_LENGTH.PASSWORD.REGEXP,
    },
    passwordRepeat: {
      value: '',
      minLength: FIELDS_LENGTH.PASSWORD.MIN,
      maxLength: FIELDS_LENGTH.PASSWORD.MAX,
      regexp: FIELDS_LENGTH.PASSWORD.REGEXP,
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
    <Form
      onSubmit={onSubmit}
      className={styles.passwordForm}
    >
      <Input
        value={formData.password.value as string}
        valid={formData.password.valid}
        onChange={(value) => onChange('password', value)}
        placeholder={t('Enter password') as string}
        type="password"
        prompt={t('Password must contain at least 1 uppercase and 1 number. Minimum 8 symbols.') as string}
      />
      <Input
        value={formData.passwordRepeat.value as string}
        valid={formData.passwordRepeat.valid && formData.passwordRepeat.value === formData.password.value}
        onChange={(value) => onChange('passwordRepeat', value)}
        placeholder={t('Confirm password') as string}
        type="password"
        prompt={t('Password must contain at least 1 uppercase and 1 number. Minimum 8 symbols.') as string}
      />
      <SubmitButton
        title={t('Save')}
        disabled={!isValid || loading}
      />
    </Form>
  );
};

export default PasswordSettingsPage;
