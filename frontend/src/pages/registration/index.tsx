import { useTranslation } from 'react-i18next';
import { Box } from '@/ui-kit';
import { ReactNode, useState } from 'react';
import { Finish, Step1, Step2, Step3 } from './components';

const RegistrationPage = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  const onContinue = () => {
    setStep(step + 1);
  };

  const contentMap = new Map([
    [1, <Step1 onContinue={onContinue} />],
    [2, <Step2 onContinue={onContinue} />],
    [3, <Step3 onContinue={onContinue} />],
    [4, <Finish />],
  ]);

  return (
    <div>
      <Box>
        <h1>{t('Registration')}</h1>
        {contentMap.get(step)}
      </Box>
    </div>
  );
};

export default RegistrationPage;
