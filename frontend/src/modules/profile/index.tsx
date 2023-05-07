import { Post } from '@/components';
import { ProfileInfo, NewPost } from './components';
import { useQuery } from '@/hooks';
import { PostsService, ProfileService } from '@/lib/service';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Loader } from '@/ui-kit';

const ProfilePage = () => {
  const { profileId } = useParams();
  const userId = useSelector((state: RootState) => state.user.id as number);

  const postsService = new PostsService();
  const profileService = new ProfileService();
  const {
    loading: postsLoading,
    data: posts,
    setData: setPosts,
  } = useQuery(() => postsService.getUserPosts(Number(profileId)));

  const like = async (id: number) => {
    await postsService.like(id);
    setPosts(posts.map((post) => (post.id === id ? { ...post, likes: post.likes + 1, liked: true } : post)));
  };

  const dislike = async (id: number) => {
    await postsService.dislike(id);
    setPosts(posts.map((post) => (post.id === id ? { ...post, likes: post.likes - 1, liked: false } : post)));
  };

  const { loading: profileLoading, data: profile } = useQuery(() => profileService.getProfile(Number(profileId)));

  const publish = async (text: string) => {
    const newPost = await postsService.createPost(text);
    setPosts([newPost, ...posts]);
  };

  return postsLoading || profileLoading ? (
    <Loader />
  ) : (
    <>
      <ProfileInfo {...profile} />
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
