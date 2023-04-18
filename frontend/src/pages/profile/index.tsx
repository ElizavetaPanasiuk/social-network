import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { RootState } from "@/store";
import {
  AvatarBlock,
  CreatePost,
  Friends,
  Post,
  ProfileData,
} from "./components";
import { Post as PostType } from "./types";
import { useState } from "react";

const ProfilePage = () => {
  const userId = useSelector((state: RootState) => state.user.id);
  console.log("USERID:", userId);
  const user = {
    avatar:
      "https://avatars.mds.yandex.net/i?id=bb951d00a0cb85705e3fb55d825cb1340a0a6b18-8498443-images-thumbs&n=13",
    firstName: "Lizaveta",
    lastName: "Panasiuk",
    dateOfBirth: new Date(2023, 4, 2),
    country: "Belarus",
    city: "Minsk",
  };
  const [posts, setPosts] = useState([
    {
      id: 1,
      createdAt: new Date(2023, 4, 2),
      firstName: "Lizaveta",
      lastName: "Panasiuk",
      avatar:
        "https://avatars.mds.yandex.net/i?id=bb951d00a0cb85705e3fb55d825cb1340a0a6b18-8498443-images-thumbs&n=13",
      text: "My first post",
    },
    {
      id: 2,
      createdAt: new Date(2023, 4, 2),
      firstName: "Lizaveta",
      lastName: "Panasiuk",
      avatar:
        "https://avatars.mds.yandex.net/i?id=bb951d00a0cb85705e3fb55d825cb1340a0a6b18-8498443-images-thumbs&n=13",
      text: "My second post",
    },
  ]);

  const addPost = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.row}>
        <AvatarBlock {...user} />
        <ProfileData {...user} />
      </div>
      <div className={styles.row}>
        <Friends />
        <div className={styles.posts}>
          <CreatePost addPost={addPost} />
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
