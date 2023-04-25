import { Box } from "@/ui-kit";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./styles.module.scss";

const FriendsLayout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className={styles.friendsLayout}>
      <Box>
        {(location.pathname === "/friends/outcoming" ||
          location.pathname === "/friends/incoming") && (
          <>
            <NavLink to="./incoming">{t("Incoming")}</NavLink>
            <NavLink to="./outcoming">{t("Outcoming")}</NavLink>
          </>
        )}
        <Outlet />
      </Box>
      <Box className={styles.navigationContainer}>
        <NavLink to=".">{t("My friends")}</NavLink>
        <NavLink to="./incoming">{t("Friend requests")}</NavLink>
        <NavLink to="/search">{t("Search for friends")}</NavLink>
        {/* TODO: ADD SEPARATE PAGE FOR FRIENDS SEARCH AS IN VK */}
      </Box>
    </div>
  );
};

export default FriendsLayout;
