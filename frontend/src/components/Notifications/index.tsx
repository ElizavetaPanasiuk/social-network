import { useSelector } from 'react-redux';

import { RootState } from '@/store';

import { Portal, Notification } from '..';
import styles from './styles.module.scss';

const Notifications = () => {
  const { notifications } = useSelector((state: RootState) => state.notifications);

  return notifications.length ? (
    <Portal
      elementId="portal"
      className={styles.notifications}
    >
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
        />
      ))}
    </Portal>
  ) : null;
};

export default Notifications;
