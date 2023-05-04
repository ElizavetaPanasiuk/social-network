import { useQuery } from '@/hooks';
import { useParams } from 'react-router-dom';
import { ProfileRow } from '@/components';
import { SubscriptionsService } from '@/lib/service';
import { Loader } from '@/ui-kit';

const SubscribersPage = () => {
  const subscribersService = new SubscriptionsService();
  const { profileId } = useParams();
  const { loading, data: subscribers } = useQuery(() => subscribersService.getSubscribers(Number(profileId)));

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        subscribers.map(({ subscriber }) => (
          <ProfileRow
            key={subscriber.id}
            {...subscriber}
          />
        ))
      )}
    </div>
  );
};

export default SubscribersPage;
