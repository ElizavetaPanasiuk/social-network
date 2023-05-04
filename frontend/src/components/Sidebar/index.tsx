import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faUser, faEdit } from '@fortawesome/free-regular-svg-icons';
import {
  faHashtag,
  faUser as faUserSolid,
  faBell as faBellSolid,
  faEnvelope as faEnvelopeSolid,
  faEdit as faEditSolid,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { RootState } from '@/store';
import styles from './styles.module.scss';

const Sidebar = () => {
  const { t } = useTranslation();
  const id = useSelector((state: RootState) => state.user.id);
  const MENU_ITEMS = [
    {
      title: t('Profile'),
      to: `/profile/${id}`,
      icon: faUser,
      activeIcon: faUserSolid,
    },
    {
      title: t('News'),
      to: '/news',
      icon: faHashtag,
      activeIcon: faHashtag,
    },
    {
      title: t('Messages'),
      to: '/messages',
      icon: faEnvelope,
      activeIcon: faEnvelopeSolid,
    },
    {
      title: t('Notifications'),
      to: '/notifications',
      icon: faBell,
      activeIcon: faBellSolid,
    },
    {
      title: t('Search'),
      to: '/search',
      icon: faSearch,
      activeIcon: faSearch,
    },
    {
      title: t('Settings'),
      to: '/settings',
      icon: faEdit,
      activeIcon: faEditSolid,
    },
  ];

  return (
    <nav>
      {MENU_ITEMS.map(({ to, title, icon, activeIcon }) => (
        <NavLink
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          key={to}
          to={to}
        >
          {({ isActive }) => (
            <>
              <FontAwesomeIcon
                icon={isActive ? activeIcon : icon}
                className={styles.navIcon}
              />
              {title}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;
