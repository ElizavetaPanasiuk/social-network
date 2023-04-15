import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Box, Button, Input } from "@/ui-kit";
import styles from "./styles.module.scss";

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box className={styles.loginContainer}>
      <h1>{t("Login")}</h1>
      <Input
        value={email}
        placeholder={t("Email") as string}
        onChange={setEmail}
      />
      <Input
        value={password}
        placeholder={t("Password") as string}
        onChange={setPassword}
      />
      <Button
        title={t("Sign In")}
        onClick={() => {
          console.log("Войти");
        }}
      />
    </Box>
  );
};

export default LoginPage;
