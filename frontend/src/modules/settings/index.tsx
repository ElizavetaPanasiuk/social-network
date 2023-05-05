import { Select } from '@/ui-kit';
import { changeLanguage } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState('');

  const selectLanguage = (lang: 'ru' | 'en') => {
    setLanguage(lang);
    changeLanguage(lang);
  };

  return (
    <div>
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
    </div>
  );
};

export default SettingsPage;
