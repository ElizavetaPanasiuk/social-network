import { Button } from "@/ui-kit";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RegistrationData } from "../types/registrationData";

type Step4Props = {
  onSubmit: () => void;
  onChange: (key: keyof RegistrationData, value: string) => void;
};

const Step4 = ({ onSubmit, onChange }: Step4Props) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLInputElement>();

  return (
    <>
      <input
        type="file"
        ref={ref}
        onChange={(e) => onChange("avatar", e.target.files[0])}
      />
      <Button title={t("Register")} onClick={onSubmit} />
    </>
  );
};

export default Step4;
