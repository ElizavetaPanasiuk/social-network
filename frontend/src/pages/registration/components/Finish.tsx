import { useTranslation } from 'react-i18next';

const Finish = () => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t('Congratulations!')}</h2>
      <p>{t('You have successfully registered!')}</p>
      <p>{t('In 5 seconds you will be redirected to the login page')}</p>
    </>
  );
};

export default Finish;
