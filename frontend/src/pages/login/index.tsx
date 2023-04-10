import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Input } from '@/ui-kit';

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      {t('Login')}
      <Input value={email} placeholder={t('Email')} />
      <Input value={password} placeholder={t('Password')} />
    </div>
  );
};

export default LoginPage;
