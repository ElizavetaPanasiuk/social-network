import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { EmptyListMessage, PageWrapper, ProfileRow } from '@/components';
import { useQuery } from '@/hooks';
import { SubscriptionsService } from '@/lib/service';
import { QueryError, SubscriptionsResponse } from '@/lib/global/types';

const SubscriptionsPage = () => {
  const { t } = useTranslation();
  const { profileId } = useParams();

  const subcriptionsService = new SubscriptionsService();

  const {
    loading,
    data: subcriptions,
    error,
  }: { loading: boolean; data: SubscriptionsResponse; error: QueryError } = useQuery(() =>
    subcriptionsService.getSubscriptions(Number(profileId)),
  );

  return (
    <PageWrapper
      loading={loading}
      error={error}
    >
      {!subcriptions?.length ? (
        <EmptyListMessage text={t('No subscriptions')} />
      ) : (
        <>
          {subcriptions.map(({ profile }) => (
            <ProfileRow
              key={profile.id}
              {...profile}
            />
          ))}
        </>
      )}
    </PageWrapper>
  );
};

export default SubscriptionsPage;
