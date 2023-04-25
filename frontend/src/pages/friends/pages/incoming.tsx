import { useQuery } from "@/hooks";
import FriendsService from "../service";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ProfileRow } from "@/components";
import { Button } from "@/ui-kit";
import { useTranslation } from "react-i18next";

const FriendsIncomingPage = () => {
  const { t } = useTranslation();
  const friendsService = new FriendsService();
  const userId = useSelector((state: RootState) => state.user.id as number);
  const [loading, data, setData] = useQuery(() =>
    friendsService.getIncomingRequests(userId)
  );

  const approveRequest = async (requestId: number) => {
    const res = await friendsService.approveRequest(requestId);
    if (res) {
      setData(data.filter((request) => request.requestId !== requestId));
    }
  };

  const declineRequest = async (requestId: number) => {
    const res = await friendsService.declineRequest(requestId);
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
                title={t("Approve")}
                onClick={() => approveRequest(requestId)}
                size="small"
              />
              <Button
                title={t("Decline")}
                onClick={() => declineRequest(requestId)}
                size="small"
              />
            </ProfileRow>
          )
        )
      )}
    </div>
  );
};

export default FriendsIncomingPage;
