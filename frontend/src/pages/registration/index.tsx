import { useTranslation } from 'react-i18next';

const RegistrationPage = () => {
  const { t } = useTranslation();
  return <div>{t('Registration')}</div>;
};

export default RegistrationPage;
