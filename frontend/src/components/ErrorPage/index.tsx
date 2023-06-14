import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

const ErrorPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.errorPage}>
      <p>{t('Error')}</p>
    </div>
  );
};

export default ErrorPage;
