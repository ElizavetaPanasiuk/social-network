import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Select } from "@/ui-kit";

type Step3Props = {
  onContinue: () => void;
};

const Step3 = ({ onContinue }: Step3Props) => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  return (
    <>
      <h2>{t("Personal information")}</h2>
      <Input
        value={firstName}
        onChange={setFirstName}
        placeholder={t("Name") as string}
      />
      <Input
        value={lastName}
        onChange={setLastName}
        placeholder={t("Surname") as string}
      />
      <Input
        value={dateOfBirth}
        onChange={setDateOfBirth}
        placeholder={t("Birthday") as string}
      />
      <Select
        value={country}
        onChange={setCountry}
        label={t("Country")}
        options={[
          { label: "Беларусь", value: "Беларусь" },
          { label: "Польша", value: "Польша" },
        ]}
      />
      <Select
        value={city}
        onChange={setCity}
        label={t("City")}
        options={[
          { label: "Минск", value: "Минск" },
          { label: "Брест", value: "Брест" },
        ]}
      />
      <Button title={t("Register")} onClick={onContinue} />
    </>
  );
};

export default Step3;
