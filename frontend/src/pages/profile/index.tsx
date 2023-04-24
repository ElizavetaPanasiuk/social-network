import styles from "./styles.module.scss";
import {
  AvatarBlock,
  CreatePost,
  Friends,
  Post,
  ProfileData,
} from "./components";
import { ProfileService, PostsService } from "./service";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useQuery } from "@/hooks";

const ProfilePage = () => {
  const profileService = new ProfileService();
  const postsService = new PostsService();
  const params = useParams();
  const userId = useSelector((state: RootState) => state.user.id);
  const profileId = Number(params.profileId);

  const [loadingPosts, posts, setPosts] = useQuery(() =>
    postsService.getPostsByUserId(profileId)
  );
  const [loadingProfile, profile] = useQuery(() =>
    profileService.getProfileData(profileId)
  );

  const addPost = async (text: string) => {
    const newPost = await postsService.createPost(Number(userId), text);
    setPosts([newPost, ...posts]);
  };

  const updatePost = async (id: number, text: string) => {
    const newPost = await postsService.updatePost(id, text);
    setPosts(posts.map((post) => (post.id === id ? newPost : post)));
  };

  const removePost = async (id: number) => {
    await postsService.removeById(id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  return loadingProfile ? (
    <p>loading</p>
  ) : (
    <div className={styles.profileContainer}>
      <div className={styles.row}>
        <AvatarBlock
          firstName={profile.firstName}
          lastName={profile.lastName}
          avatar={profile.avatar}
        />
        <ProfileData {...profile} />
      </div>
      <div className={styles.row}>
        <Friends />
        <div className={styles.posts}>
          {userId === profileId && <CreatePost addPost={addPost} />}
          {loadingPosts ? (
            <p>loading</p>
          ) : (
            posts.map((post) => (
              <Post
                key={post.id}
                {...post}
                updatePost={updatePost}
                removePost={removePost}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
