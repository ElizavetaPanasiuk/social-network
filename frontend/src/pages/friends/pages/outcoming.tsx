import { useQuery } from "@/hooks";
import FriendsService from "../service";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ProfileRow } from "@/components";
import { Button } from "@/ui-kit";
import { useTranslation } from "react-i18next";

const FriendsOutcomingPage = () => {
  const { t } = useTranslation();
  const friendsService = new FriendsService();
  const userId = useSelector((state: RootState) => state.user.id as number);
  const [loading, data, setData] = useQuery(() =>
    friendsService.getOutcomingRequests(userId)
  );

  const cancelRequest = async (requestId: number) => {
    const res = await friendsService.cancelRequest(requestId);
    if (res) {
      setData(data.filter((request) => request.requestId !== requestId));
    }
  };

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : (
        data.map(
          ({
            requestId,
            ...profile
          }: {
            requestId: number;
            profile: {
              id: number;
              firstName: string;
              lastName: string;
              avatar: string;
            };
          }) => (
            <ProfileRow key={requestId} {...profile}>
              <Button
                title={t("Cancel")}
                onClick={() => friendsService.cancelRequest(requestId)}
                size="small"
              />
            </ProfileRow>
          )
        )
      )}
    </div>
  );
};

export default FriendsOutcomingPage;
