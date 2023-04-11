import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Box, Input } from '@/ui-kit';

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Box>
        <h1>{t('Login')}</h1>
        <Input value={email} placeholder={t('Email') as string} onChange={setEmail} />
        <Input value={password} placeholder={t('Password') as string} onChange={setPassword} />
      </Box>
    </div>
  );
};

export default LoginPage;
