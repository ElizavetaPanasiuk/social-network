import { Post } from "@/components";
import { ProfileInfo, NewPost } from "./components";
import { useQuery } from "@/hooks";
import { PostsService } from "@/service";
import { useParams } from "react-router-dom";
import ProfileService from "./service";

const ProfilePage = () => {
  const { profileId } = useParams();

  const postsService = new PostsService();
  const profileService = new ProfileService();
  const [loading, posts] = useQuery(() =>
    postsService.getUserPosts(Number(profileId))
  );

  const [profileLoading, profile] = useQuery(() =>
    profileService.getProfile(Number(profileId))
  );

  return (
    <>
      {profileLoading ? <p>loading</p> : <ProfileInfo {...profile} />}
      <NewPost />
      {loading ? (
        <p>loading</p>
      ) : (
        posts.map((post) => <Post key={post.id} {...post} />)
      )}
    </>
  );
};

export default ProfilePage;
