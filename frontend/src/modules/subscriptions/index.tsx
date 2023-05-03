import { useQuery } from '@/hooks';
import { useParams } from 'react-router-dom';
import { ProfileRow } from '@/components';
import { SubscriptionsService } from '@/lib/service';

const SubscriptionsPage = () => {
  const subcriptionsService = new SubscriptionsService();
  const { profileId } = useParams();
  const { loading, data: subcriptions } = useQuery(() => subcriptionsService.getSubscriptions(Number(profileId)));

  return (
    <div>
      {loading ? (
        <p>loading</p>
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
