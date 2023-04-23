import { useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "@/ui-kit";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onSubmitSearch = () => {
    navigate(`/search?search=${search}`);
    setSearch("");
  };

  return (
    <header className={styles.header}>
      <Input
        placeholder={t("Search") as string}
        value={search}
        onChange={setSearch}
        onEnter={onSubmitSearch}
      />
    </header>
  );
};

export default Header;
