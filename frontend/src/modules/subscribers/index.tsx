import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { EmptyListMessage, ProfileRow } from '@/components';
import { useQuery } from '@/hooks';
import { SubscriptionsService } from '@/lib/service';
import { SubscribersResponse } from '@/lib/global/types';

import { Loader } from '@/ui-kit';

const SubscribersPage = () => {
  const { t } = useTranslation();
  const subscribersService = new SubscriptionsService();
  const { profileId } = useParams();
  const { loading, data: subscribers }: { loading: boolean; data: SubscribersResponse } = useQuery(() =>
    subscribersService.getSubscribers(Number(profileId)),
  );

  return loading ? (
    <Loader />
  ) : !subscribers.length ? (
    <EmptyListMessage text={t('No subscribers')} />
  ) : (
    subscribers.map(({ subscriber }) => (
      <ProfileRow
        key={subscriber.id}
        {...subscriber}
      />
    ))
  );
};

export default SubscribersPage;
