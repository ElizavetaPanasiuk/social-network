import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import { Form, LanguageSelector } from '@/components';
import { useForm, useMutation } from '@/hooks';
import { Box, Input, SubmitButton } from '@/ui-kit';
import { AuthService } from '@/lib/service';
import FIELDS_VALIDATION_RULES from '@/lib/constants/fields-validation-rules';
import { signIn } from '@/store/userSlice';

import styles from './styles.module.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const authService = new AuthService();

  const { formData, onChange, isValid } = useForm({
    email: {
      value: '',
      minLength: FIELDS_VALIDATION_RULES.EMAIL.MIN,
      maxLength: FIELDS_VALIDATION_RULES.EMAIL.MAX,
      regexp: FIELDS_VALIDATION_RULES.EMAIL.REGEXP,
    },
    password: {
      value: '',
      minLength: FIELDS_VALIDATION_RULES.PASSWORD.MIN,
      maxLength: FIELDS_VALIDATION_RULES.PASSWORD.MAX,
      regexp: FIELDS_VALIDATION_RULES.PASSWORD.REGEXP,
    },
  });

  const { mutate: login, loading } = useMutation(
    () => authService.signIn(formData.email.value, formData.password.value),
    {
      onSuccess: (result) => {
        const { access_token } = result;
        Cookies.set('token', access_token);
        const { id, firstName, lastName } = jwtDecode<{ id: number; firstName: string; lastName: string; exp: number }>(
          access_token,
        );
        dispatch(signIn({ id, firstName, lastName }));
        navigate(`/news`);
      },
    },
  );

  return (
    <>
      <Form
        onSubmit={login}
        className={styles.formContainer}
      >
        <Box className={styles.loginContainer}>
          <h1>{t('Login')}</h1>
          <Input
            value={formData.email.value as string}
            valid={formData.email.valid}
            placeholder={t('Email')}
            onChange={(value) => onChange('email', value)}
            type="email"
          />
          <Input
            value={formData.password.value as string}
            valid={formData.password.valid}
            placeholder={t('Password')}
            onChange={(value) => onChange('password', value)}
            type="password"
          />
          <SubmitButton
            title={t('Sign In')}
            disabled={!isValid || loading}
          />
          <Link to="/registration">{t('Or register')}</Link>
        </Box>
      </Form>
      <LanguageSelector />
    </>
  );
};

export default LoginPage;
