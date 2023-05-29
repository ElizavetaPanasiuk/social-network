import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import { Form, LanguageSelector } from '@/components';
import { useForm, useMutation } from '@/hooks';
import { Box, Input, SubmitButton } from '@/ui-kit';
import { LoginService } from '@/lib/service';
import FIELDS_LENGTH from '@/lib/constants/fields-length';
import { signIn } from '@/store/userSlice';

import styles from './styles.module.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loginService = new LoginService();

  const { formData, onChange, isValid } = useForm({
    email: {
      value: '',
      minLength: FIELDS_LENGTH.EMAIL.MIN,
      maxLength: FIELDS_LENGTH.EMAIL.MAX,
      regexp: FIELDS_LENGTH.EMAIL.REGEXP,
    },
    password: {
      value: '',
      minLength: FIELDS_LENGTH.PASSWORD.MIN,
      maxLength: FIELDS_LENGTH.PASSWORD.MAX,
      regexp: FIELDS_LENGTH.EMAIL.REGEXP,
    },
  });

  const { mutate: login, loading } = useMutation(
    () => loginService.signIn(formData.email.value, formData.password.value),
    {
      onSuccess: (result) => {
        const { access_token } = result;
        Cookies.set('token', access_token);
        const { id, firstName, lastName } = jwtDecode(access_token) as {
          id: number;
          firstName: string;
          lastName: string;
        };
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
            placeholder={t('Email') as string}
            onChange={(value) => onChange('email', value)}
            type="email"
          />
          <Input
            value={formData.password.value as string}
            valid={formData.password.valid}
            placeholder={t('Password') as string}
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
