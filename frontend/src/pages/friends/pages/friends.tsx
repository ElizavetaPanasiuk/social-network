import { useQuery } from "@/hooks";
import FriendsService from "../service";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ProfileRow } from "@/components";

const FriendsPage = () => {
  const friendsService = new FriendsService();
  const userId = useSelector((state: RootState) => state.user.id as number);
  const [loading, data] = useQuery(() => friendsService.getFriends(userId));

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : (
        data.map((friend) => <ProfileRow key={friend.id} {...friend} />)
      )}
    </div>
  );
};

export default FriendsPage;
