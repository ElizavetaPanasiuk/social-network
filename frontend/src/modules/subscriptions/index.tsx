import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { EmptyListMessage, ProfileRow } from '@/components';
import { useQuery } from '@/hooks';
import { SubscriptionsService } from '@/lib/service';
import { SubscriptionsResponse } from '@/lib/global/types';
import { Loader } from '@/ui-kit';

const SubscriptionsPage = () => {
  const { t } = useTranslation();
  const { profileId } = useParams();

  const subcriptionsService = new SubscriptionsService();

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
