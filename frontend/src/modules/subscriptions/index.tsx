import { useQuery } from '@/hooks';
import { useParams } from 'react-router-dom';
import { ProfileRow } from '@/components';
import { SubscriptionsService } from '@/lib/service';
import { Loader } from '@/ui-kit';
import { SubscriptionsResponse } from '@/lib/global/types';

const SubscriptionsPage = () => {
  const subcriptionsService = new SubscriptionsService();
  const { profileId } = useParams();
  const { loading, data: subcriptions }: { loading: boolean; data: SubscriptionsResponse } = useQuery(() =>
    subcriptionsService.getSubscriptions(Number(profileId)),
  );

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        subcriptions.map(({ profile }) => (
          <ProfileRow
            key={profile.id}
            {...profile}
          />
        ))
      )}
    </div>
  );
};

export default SubscriptionsPage;
