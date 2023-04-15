import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Finish, Step1, Step2, Step3 } from "./components";
import { Box } from "@/ui-kit";
import styles from "./styles.module.scss";

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
    <Box className={styles.registrationContainer}>
      <h1>{t("Registration")}</h1>
      {contentMap.get(step)}
    </Box>
  );
};

export default RegistrationPage;
