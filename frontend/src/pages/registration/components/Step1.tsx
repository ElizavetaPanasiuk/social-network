import { Button, Input } from "@/ui-kit";
import { useTranslation } from "react-i18next";
import { RegistrationData } from "../types/registrationData";

type Step1Props = {
  onContinue: () => void;
  registrationData: RegistrationData;
  onChange: (key: keyof RegistrationData, value: string) => void;
};

const Step1 = ({ onContinue, registrationData, onChange }: Step1Props) => {
  const { t } = useTranslation();

  return (
    <>
      <h2>{t("Enter email")}</h2>
      <p>{t("Your email will be used to login")}</p>
      <Input
        value={registrationData.email}
        onChange={(value) => onChange("email", value)}
        placeholder={t("Email") as string}
      />
      <Button title={t("Continue")} onClick={onContinue} />
    </>
  );
};

export default Step1;
