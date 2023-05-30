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

import styles from './styles.module.scss';

type NotificationProps = {
  id: number;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
};

const Notification = ({ id, type, message }: NotificationProps) => {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.notification}
      data-type={type}
    >
      <FontAwesomeIcon
        icon={
          type === 'success'
            ? faCheckCircle
            : type === 'warning'
            ? faExclamationTriangle
            : type === 'error'
            ? faExclamationCircle
            : faInfoCircle
        }
        className={styles.icon}
      />
      <div>
        <h4 className={styles.heading}>
          {type === 'success' ? 'Success' : type === 'warning' ? 'Warning' : type === 'error' ? 'Error' : 'Info'}
        </h4>
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
