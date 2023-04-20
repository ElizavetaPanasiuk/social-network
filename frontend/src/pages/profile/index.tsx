import styles from "./styles.module.scss";
import {
  AvatarBlock,
  CreatePost,
  Friends,
  Post,
  ProfileData,
} from "./components";
import { Post as PostType, ProfileData as ProfileDataType } from "./types";
import { useEffect, useState } from "react";
import { ProfileService, PostsService } from "./service";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ProfilePage = () => {
  const profileService = new ProfileService();
  const postsService = new PostsService();
  const params = useParams();
  const userId = useSelector((state: RootState) => state.user.id);
  const profileId = Number(params.profileId);

  const [profileData, setProfileData] = useState<ProfileDataType>();
  const [posts, setPosts] = useState<PostType[]>([]);

  const getPosts = async () => {
    const data = await postsService.getPostsByUserId(profileId);
    setPosts(data);
  };

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

  const getProfileData = async (profileId: number) => {
    const profileData = await profileService.getProfileData(profileId);
    setProfileData({
      ...profileData,
      avatar:
        "https://avatars.mds.yandex.net/i?id=bb951d00a0cb85705e3fb55d825cb1340a0a6b18-8498443-images-thumbs&n=13",
    });
  };

  useEffect(() => {
    getProfileData(profileId);
    getPosts();
  }, []);

  return profileData ? (
    <div className={styles.profileContainer}>
      <div className={styles.row}>
        <AvatarBlock
          firstName={profileData.firstName}
          lastName={profileData.lastName}
          avatar={profileData.avatar}
        />
        <ProfileData {...profileData} />
      </div>
      <div className={styles.row}>
        <Friends />
        <div className={styles.posts}>
          {userId === profileId && <CreatePost addPost={addPost} />}
          {posts.map((post) => (
            <Post
              key={post.id}
              {...post}
              updatePost={updatePost}
              removePost={removePost}
            />
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>loading guys, wait</p>
  );
};

export default ProfilePage;
