import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

import { Avatar } from '@/ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBirthdayCake, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';

type ProfileInfoProps = {
  firstName: string;
  lastName: string;
  joined: string;
  dateOfBirth: string;
  subscriptions: number;
  subscribers: number;
  country: string;
  city: string;
  avatar: string;
};

const ProfileInfo = ({
  firstName,
  lastName,
  joined,
  dateOfBirth,
  subscriptions,
  subscribers,
  country,
  city,
  avatar,
}: ProfileInfoProps) => {
  const { t } = useTranslation();
  const { profileId } = useParams();

  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileHeaderBackground}>
        <Avatar
          src={avatar}
          alt="avatar"
          size="large"
          border
        />
      </div>
      <div className={styles.profileInfo}>
        <h2>
          {firstName} {lastName}
        </h2>
        <div className={styles.details}>
          <p>
            <FontAwesomeIcon icon={faBirthdayCake} />
            {t('Born')} {dateOfBirth}
          </p>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {country}, {city}
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendar} />
            {t('Joined')} {joined}
          </p>
          <p>
            <Link to={`/subscribers/${profileId}`}>
              {subscribers} {t('Subscribers')}
            </Link>
            <Link to={`/subscriptions/${profileId}`}>
              {subscriptions} {t('Subscriptions')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
