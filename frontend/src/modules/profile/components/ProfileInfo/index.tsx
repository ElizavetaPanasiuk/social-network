import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

import { Avatar } from '@/ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBirthdayCake, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';

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
          <p className={styles.detailsLine}>
            <FontAwesomeIcon icon={faBirthdayCake} />
            {t('Born')} {moment(dateOfBirth).format('LL')}
          </p>
          <p className={styles.detailsLine}>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            {country}, {city}
          </p>
          <p className={styles.detailsLine}>
            <FontAwesomeIcon icon={faCalendar} />
            {t('Joined')} {moment(joined).format('LL')}
          </p>
          <p className={styles.detailsLine}>
            <Link to={`/subscribers/${profileId}`}>
              <span className={styles.detailsIndicator}>{subscribers}</span> {t('Subscribers')}
            </Link>
            <Link to={`/subscriptions/${profileId}`}>
              <span className={styles.detailsIndicator}>{subscriptions}</span> {t('Subscriptions')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
