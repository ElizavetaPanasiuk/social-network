import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { IconButton } from '@/ui-kit';
import { removeNotification } from '@/store/notificationsSlice';
import { NotificationType } from '@/lib/global/types';

import styles from './styles.module.scss';

type NotificationProps = {
  id: number;
  type: NotificationType;
  message: string;
};

const TYPE_ICON = {
  success: faCheckCircle,
  warning: faExclamationTriangle,
  error: faExclamationCircle,
  info: faInfoCircle,
};

const TYPE_HEADING = {
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  info: 'Info',
};

const Notification = ({ id, type, message }: NotificationProps) => {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.notification}
      data-type={type}
    >
      <FontAwesomeIcon
        icon={TYPE_ICON[type]}
        className={styles.icon}
      />
      <div>
        <h4 className={styles.heading}>{TYPE_HEADING[type]}</h4>
        <p>{message}</p>
      </div>
      <IconButton
        icon={faTimes}
        onClick={() => dispatch(removeNotification({ id }))}
        className={styles.closeButton}
      />
    </div>
  );
};

export default Notification;
