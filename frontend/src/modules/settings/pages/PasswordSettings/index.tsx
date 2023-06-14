import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

import { Form } from '@/components';
import { useForm, useMutation } from '@/hooks';
import FIELDS_VALIDATION_RULES from '@/lib/constants/fields-validation-rules';
import { ProfileService } from '@/lib/service';
import { RootState } from '@/store';
import { signOut } from '@/store/userSlice';
import { Input, SubmitButton } from '@/ui-kit';

import styles from './styles.module.scss';

const PasswordSettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.id as number);

  const profileService = new ProfileService();

  const { formData, onChange, isValid, resetForm } = useForm({
    password: {
      value: '',
      minLength: FIELDS_VALIDATION_RULES.PASSWORD.MIN,
      maxLength: FIELDS_VALIDATION_RULES.PASSWORD.MAX,
      regexp: FIELDS_VALIDATION_RULES.PASSWORD.REGEXP,
    },
    passwordRepeat: {
      value: '',
      minLength: FIELDS_VALIDATION_RULES.PASSWORD.MIN,
      maxLength: FIELDS_VALIDATION_RULES.PASSWORD.MAX,
      regexp: FIELDS_VALIDATION_RULES.PASSWORD.REGEXP,
    },
  });

  const { mutate: onSubmit, loading } = useMutation(
    () =>
      profileService.updatePassword(userId, {
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
        value={formData.password.value}
        valid={formData.password.valid}
        onChange={(value) => onChange('password', value)}
        placeholder={t('Enter password')}
        type="password"
        prompt={t('Password must contain at least 1 uppercase and 1 number. Minimum 8 symbols.')}
      />
      <Input
        value={formData.passwordRepeat.value}
        valid={formData.passwordRepeat.valid && formData.passwordRepeat.value === formData.password.value}
        onChange={(value) => onChange('passwordRepeat', value)}
        placeholder={t('Confirm password')}
        type="password"
        prompt={t('Password must contain at least 1 uppercase and 1 number. Minimum 8 symbols.')}
      />
      <SubmitButton
        title={t('Save')}
        disabled={!isValid || loading}
      />
    </Form>
  );
};

export default PasswordSettingsPage;
