import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import styles from "./styles.module.scss";

const Sidebar = () => {
  const { t } = useTranslation();
  const id = useSelector((state: RootState) => state.user.id);
  const MENU_ITEMS = [
    {
      title: t("Profile"),
      to: `/profile/${id}`,
    },
    {
      title: t("Friends"),
      to: "/friends",
    },
    {
      title: t("Messenger"),
      to: "/messenger",
    },
  ];

  return (
    <nav>
      <ul>
        {MENU_ITEMS.map(({ to, title }) => (
          <li key={to}>
            <NavLink
              className={({ isActive }) => (isActive ? styles.active : "")}
              to={to}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
