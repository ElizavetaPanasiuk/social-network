import styles from "./styles.module.scss";
import { useLocation } from "react-router-dom";
import SearchService from "./service";
import { ProfileCard } from "@/components";
import Filters from "./components/Filters";
import { useQuery } from "@/hooks";

const SearchPage = () => {
  const location = useLocation();
  const searchService = new SearchService();
  const [loading, data] = useQuery(() => searchService.get(location.search));

  return (
    <div className={styles.searchPage}>
      {loading
        ? "loading"
        : data.map((profile) => <ProfileCard key={profile.id} {...profile} />)}
      <Filters />
    </div>
  );
};

export default SearchPage;
