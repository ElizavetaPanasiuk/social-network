import { Avatar } from '@/ui-kit';

import styles from './styles.module.scss';

type MessagesHeaderProps = {
  avatar: string;
  firstName: string;
  lastName: string;
};

const MessagesHeader = ({ avatar, firstName, lastName }: MessagesHeaderProps) => (
  <div className={styles.messagesHeader}>
    <Avatar
      src={avatar}
      alt={`${firstName} ${lastName}`}
    />
    <h4>
      {firstName} {lastName}
    </h4>
  </div>
);

export default MessagesHeader;
