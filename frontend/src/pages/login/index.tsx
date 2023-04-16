import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input } from "@/ui-kit";
import styles from "./styles.module.scss";
import LoginService from "./service";
import jwtDecode from "jwt-decode";
import { signIn } from "@/store/userSlice";

const LoginPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginService = new LoginService();

  const login = async (email: string, password: string) => {
    const { access_token } = await loginService.signIn(email, password);
    Cookies.set("token", access_token);
    const { id, firstName, lastName } = jwtDecode(access_token) as {
      id: number;
      firstName: string;
      lastName: string;
    };
    dispatch(signIn({ id, firstName, lastName }));
    navigate(`/profile/${id}`);
  };

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
        type="password"
      />
      <Button title={t("Sign In")} onClick={() => login(email, password)} />
    </Box>
  );
};

export default LoginPage;
