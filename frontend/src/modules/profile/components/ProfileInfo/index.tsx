import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faBirthdayCake, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { RootState } from '@/store';
import { Avatar, Button } from '@/ui-kit';

import styles from './styles.module.scss';

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
  isSubscribed: boolean;
  subscribe: () => void;
  unsubscribe: () => void;
  startMessaging: () => void;
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
  isSubscribed,
  subscribe,
  unsubscribe,
  startMessaging,
}: ProfileInfoProps) => {
  const { t } = useTranslation();
  const { profileId } = useParams();
  const userId = useSelector((state: RootState) => state.user.id);

  return (
    <div className={styles.profileHeader}>
      <div className={styles.profileHeaderBackground}>
        <Avatar
          src={avatar}
          alt="avatar"
          size="large"
          border
        />
        {profileId && userId !== +profileId && (
          <div className={styles.profileActions}>
            <Button
              title={t('Message')}
              onClick={startMessaging}
            />
            {isSubscribed ? (
              <Button
                title={t('Unsubscribe')}
                onClick={unsubscribe}
                variant="outlined"
              />
            ) : (
              <Button
                title={t('Subscribe')}
                onClick={subscribe}
              />
            )}
          </div>
        )}
      </div>
      <div className={styles.profileInfo}>
        <h1>
          {firstName} {lastName}
        </h1>
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
