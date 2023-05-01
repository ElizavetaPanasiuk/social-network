import { Post } from "@/components";
import { ProfileInfo, NewPost } from "./components";
import { useQuery } from "@/hooks";
import { PostsService } from "@/service";
import { useParams } from "react-router-dom";
import ProfileService from "./service";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ProfilePage = () => {
  const { profileId } = useParams();
  const userId = useSelector((state: RootState) => state.user.id as number);

  const postsService = new PostsService();
  const profileService = new ProfileService();
  const [loading, posts, setPosts] = useQuery(() =>
    postsService.getUserPosts(Number(profileId))
  );

  const like = async (id: number) => {
    await postsService.like(userId, id);
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, likesCount: +post.likesCount + 1, liked: true }
          : post
      )
    );
  };

  const dislike = async (id: number) => {
    await postsService.dislike(userId, id);
    setPosts(
      posts.map((post) =>
        post.id === id
          ? { ...post, likesCount: post.likesCount - 1, liked: false }
          : post
      )
    );
  };

  const [profileLoading, profile] = useQuery(() =>
    profileService.getProfile(Number(profileId))
  );

  const publish = async (text: string) => {
    const newPost = await postsService.createPost(userId, text);
    console.log(newPost);
    setPosts([newPost, ...posts]);
  };

  return (
    <>
      {profileLoading ? <p>loading</p> : <ProfileInfo {...profile} />}
      <NewPost publish={publish} />
      {loading ? (
        <p>loading</p>
      ) : (
        posts.map((post) => (
          <Post key={post.id} {...post} like={like} dislike={dislike} />
        ))
      )}
    </>
  );
};

export default ProfilePage;
