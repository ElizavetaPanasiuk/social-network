import { useQuery } from '@/hooks';
import { useParams } from 'react-router-dom';
import { EmptyListMessage, ProfileRow } from '@/components';
import { SubscriptionsService } from '@/lib/service';
import { Loader } from '@/ui-kit';
import { SubscribersResponse } from '@/lib/global/types';
import { useTranslation } from 'react-i18next';

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
