import { Button, Select } from '@/ui-kit';
import i18next, { changeLanguage } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { signOut } from '@/store/userSlice';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
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
    <div className={styles.settingsPage}>
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
    </div>
  );
};

export default SettingsPage;
