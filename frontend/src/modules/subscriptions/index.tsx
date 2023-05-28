import { useQuery } from '@/hooks';
import { useParams } from 'react-router-dom';
import { EmptyListMessage, ProfileRow } from '@/components';
import { SubscriptionsService } from '@/lib/service';
import { Loader } from '@/ui-kit';
import { SubscriptionsResponse } from '@/lib/global/types';
import { useTranslation } from 'react-i18next';

const SubscriptionsPage = () => {
  const { t } = useTranslation();
  const subcriptionsService = new SubscriptionsService();
  const { profileId } = useParams();
  const { loading, data: subcriptions }: { loading: boolean; data: SubscriptionsResponse } = useQuery(() =>
    subcriptionsService.getSubscriptions(Number(profileId)),
  );

  return loading ? (
    <Loader />
  ) : !subcriptions.length ? (
    <EmptyListMessage text={t('No subscriptions')} />
  ) : (
    subcriptions.map(({ profile }) => (
      <ProfileRow
        key={profile.id}
        {...profile}
      />
    ))
  );
};

export default SubscriptionsPage;
