import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { EmptyListMessage, PageWrapper, ProfileRow } from '@/components';
import { useQuery } from '@/hooks';
import { SubscriptionsService } from '@/lib/service';
import { QueryError, SubscribersResponse } from '@/lib/global/types';

const SubscribersPage = () => {
  const { t } = useTranslation();
  const { profileId } = useParams();

  const subscribersService = new SubscriptionsService();

  const {
    loading,
    data: subscribers,
    error,
  }: { loading: boolean; data: SubscribersResponse; error: QueryError } = useQuery(() =>
    subscribersService.getSubscribers(Number(profileId)),
  );

  return (
    <PageWrapper
      loading={loading}
      error={error}
    >
      {!subscribers?.length ? (
        <EmptyListMessage text={t('No subscribers')} />
      ) : (
        <>
          {subscribers.map(({ subscriber }) => (
            <ProfileRow
              key={subscriber.id}
              {...subscriber}
            />
          ))}
        </>
      )}
    </PageWrapper>
  );
};

export default SubscribersPage;
