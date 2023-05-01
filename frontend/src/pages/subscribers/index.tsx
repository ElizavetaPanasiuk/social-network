import { useQuery } from "@/hooks";
import SubscribersService from "./service";
import { useParams } from "react-router-dom";
import { ProfileRow } from "@/components";

const SubscribersPage = () => {
  const subscribersService = new SubscribersService();
  const { profileId } = useParams();
  const [loading, subscribers] = useQuery(() =>
    subscribersService.getSubscribers(Number(profileId))
  );

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : (
        subscribers.map(({ subscriber }) => (
          <ProfileRow key={subscriber.id} {...subscriber} />
        ))
      )}
    </div>
  );
};

export default SubscribersPage;
