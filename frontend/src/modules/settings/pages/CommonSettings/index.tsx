import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import i18next, { changeLanguage } from 'i18next';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

import { signOut } from '@/store/userSlice';
import { Button, Select } from '@/ui-kit';

const CommonSettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18next.language);

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    changeLanguage(lang);
  };

  const onSignOut = () => {
    dispatch(signOut());
    Cookies.remove('token');
    navigate('/login');
  };

  return (
    <>
      <h3>{t('Change language')}</h3>
      <Select
        label={t('Select language')}
        value={language}
        options={[
          { label: 'English', value: 'en' },
          { label: 'Русский', value: 'ru' },
        ]}
        onChange={selectLanguage}
      />
      <Button
        title={t('Sign Out')}
        onClick={onSignOut}
      />
    </>
  );
};

export default CommonSettingsPage;