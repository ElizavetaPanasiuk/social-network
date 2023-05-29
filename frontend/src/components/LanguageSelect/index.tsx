import { useState } from 'react';
import i18next from 'i18next';

import { Select } from '@/ui-kit';

import styles from './styles.module.scss';

const LanguageSelector = () => {
  const [language, setLanguage] = useState(i18next.language);

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    i18next.changeLanguage(lang);
  };

  return (
    <Select
      label={language}
      value={language}
      options={[
        { label: 'EN', value: 'en' },
        { label: 'RU', value: 'ru' },
      ]}
      onChange={selectLanguage}
      className={styles.languageSelector}
    />
  );
};

export default LanguageSelector;
