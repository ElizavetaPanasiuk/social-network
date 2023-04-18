import styles from './styles.module.scss';
import { AvatarBlock, CreatePost, Friends, Post, ProfileData } from './components';
import { Post as PostType, ProfileData as ProfileDataType } from './types';
import { useEffect, useState } from 'react';
import ProfileService from './service';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const profileService = new ProfileService();
  const params = useParams();

  const [profileData, setProfileData] = useState<ProfileDataType>();
  const [posts, setPosts] = useState([
    {
      id: 1,
      createdAt: new Date(2023, 4, 2),
      firstName: 'Lizaveta',
      lastName: 'Panasiuk',
      avatar: 'https://avatars.mds.yandex.net/i?id=bb951d00a0cb85705e3fb55d825cb1340a0a6b18-8498443-images-thumbs&n=13',
      text: 'My first post',
    },
    {
      id: 2,
      createdAt: new Date(2023, 4, 2),
      firstName: 'Lizaveta',
      lastName: 'Panasiuk',
      avatar: 'https://avatars.mds.yandex.net/i?id=bb951d00a0cb85705e3fb55d825cb1340a0a6b18-8498443-images-thumbs&n=13',
      text: 'My second post',
    },
  ]);

  const addPost = (newPost: PostType) => {
    setPosts([newPost, ...posts]);
  };

  const getProfileData = async (profileId: number) => {
    const profileData = await profileService.getProfileData(profileId);
    setProfileData({
      ...profileData,
      avatar: 'https://avatars.mds.yandex.net/i?id=bb951d00a0cb85705e3fb55d825cb1340a0a6b18-8498443-images-thumbs&n=13',
    });
  };

  useEffect(() => {
    const profileId = params.profileId;
    getProfileData(Number(profileId));
  }, []);

  return profileData ? (
    <div className={styles.profileContainer}>
      <div className={styles.row}>
        <AvatarBlock firstName={profileData.firstName} lastName={profileData.lastName} avatar={profileData.avatar} />
        <ProfileData {...profileData} />
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
  ) : (
    <p>loading guys, wait</p>
  );
};

export default ProfilePage;
