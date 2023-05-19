import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Input, SubmitButton } from '@/ui-kit';
import styles from './styles.module.scss';
import { LoginService } from '@/lib/service';
import jwtDecode from 'jwt-decode';
import { signIn } from '@/store/userSlice';
import { useMutation } from '@/hooks';
import { Form, LanguageSelector } from '@/components';
import FIELDS_LENGTH from '@/lib/constants/fields-length';
import { useForm } from '@/hooks';

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginService = new LoginService();

  const { formData, onChange, isValid } = useForm({
    email: {
      value: '',
      minLength: FIELDS_LENGTH.EMAIL.MIN,
      maxLength: FIELDS_LENGTH.EMAIL.MAX,
    },
    password: {
      value: '',
      minLength: FIELDS_LENGTH.PASSWORD.MIN,
      maxLength: FIELDS_LENGTH.PASSWORD.MAX,
    },
  });

  const { mutate: login } = useMutation(() => loginService.signIn(email, password), {
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
  });

  return (
    <>
      <Form onSubmit={login} className={styles.formContainer}>
        <Box className={styles.loginContainer}>
          <h1>{t('Login')}</h1>
          <Input
            value={formData.email.value as string}
            valid={formData.email.valid}
            placeholder={t('Email') as string}
            onChange={(value) => onChange('email', value)}
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
            disabled={!isValid}
          />
          <Link to="/registration">{t('Or register')}</Link>
        </Box>
      </Form>
      <LanguageSelector />
    </>
  );
};

export default LoginPage;
