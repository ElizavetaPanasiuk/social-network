import { Tabs } from '@/ui-kit';
import { useState } from 'react';
import styles from './styles.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const TABS = [
    { label: t('Common'), value: './common' },
    { label: t('Profile'), value: './profile' },
    { label: t('Password'), value: './password' },
  ];

  const [tab, setTab] = useState(TABS[0].value);

  return (
    <div className={styles.settingsPage}>
      <Tabs
        tabs={TABS}
        value={tab}
        onChange={(tab) => {
          setTab(tab.value);
          navigate(tab.value);
        }}
      />
      <Outlet />
    </div>
  );
};

export default SettingsPage;
