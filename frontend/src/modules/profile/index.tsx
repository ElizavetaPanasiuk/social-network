import { Post } from '@/components';
import { ProfileInfo, NewPost } from './components';
import { useMutation, useQuery } from '@/hooks';
import { PostsService, ProfileService } from '@/lib/service';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Loader } from '@/ui-kit';
import { SubscriptionsService } from '@/lib/service';

const ProfilePage = () => {
  const { profileId } = useParams();
  const userId = useSelector((state: RootState) => state.user.id as number);

  const postsService = new PostsService();
  const profileService = new ProfileService();
  const subscriptionsService = new SubscriptionsService();
  const {
    loading: postsLoading,
    data: posts,
    setData: setPosts,
  } = useQuery(() => postsService.getUserPosts(Number(profileId)));
  const {
    loading: profileLoading,
    data: profile,
    setData: setProfileData,
  } = useQuery(() => profileService.getProfile(Number(profileId)));

  const like = async (id: number) => {
    await postsService.like(id);
    setPosts(posts.map((post) => (post.id === id ? { ...post, likes: post.likes + 1, liked: true } : post)));
  };

  const dislike = async (id: number) => {
    await postsService.dislike(id);
    setPosts(posts.map((post) => (post.id === id ? { ...post, likes: post.likes - 1, liked: false } : post)));
  };

  const { mutate: publish } = useMutation((text: string) => postsService.createPost(text), {
    onSuccess: (newPost) => setPosts([newPost, ...posts]),
  });

  const subscribe = async () => {
    await subscriptionsService.subscribe(userId, +profileId);
    setProfileData({ ...profile, isSubscribed: true, subscribers: profile.subscribers + 1 });
  };

  const unsubscribe = async () => {
    await subscriptionsService.unsubsribe(userId, +profileId);
    setProfileData({ ...profile, isSubscribed: false, subscribers: profile.subscribers - 1 });
  };

  return postsLoading || profileLoading ? (
    <Loader />
  ) : (
    <>
      <ProfileInfo
        {...profile}
        subscribe={subscribe}
        unsubscribe={unsubscribe}
      />
      {+profileId === userId && <NewPost publish={publish} />}
      {posts.map((post) => (
        <Post
          key={post.id}
          {...post}
          like={like}
          dislike={dislike}
        />
      ))}
    </>
  );
};

export default ProfilePage;
