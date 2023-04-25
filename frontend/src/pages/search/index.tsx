import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";
import SearchService from "./service";
import { ProfileRow } from "@/components";
import Filters from "./components/Filters";
import { useQuery } from "@/hooks";
import { Button } from "@/ui-kit";
import { useTranslation } from "react-i18next";
import { FriendRequestsService } from "../profile/service";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const SearchPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const searchService = new SearchService();
  const friendRequestsService = new FriendRequestsService();
  const [loading, data] = useQuery(() => searchService.get(location.search));
  const userId = useSelector((state: RootState) => state.user.id as number);

  return (
    <div className={styles.searchPage}>
      {loading
        ? "loading"
        : data.map((profile) => (
            <ProfileRow key={profile.id} {...profile}>
              <Button
                title={t("Request friends")}
                onClick={friendRequestsService.createRequest(
                  userId,
                  profile.id
                )}
                size="small"
              />
            </ProfileRow>
          ))}
      <Filters />
    </div>
  );
};

export default SearchPage;
