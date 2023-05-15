import { Post } from '@/components';
import { ProfileInfo, NewPost } from './components';
import { useMutation, useQuery } from '@/hooks';
import { PostsService, ProfileService } from '@/lib/service';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Loader } from '@/ui-kit';
import { SubscriptionsService } from '@/lib/service';
import { useRef } from 'react';

const ProfilePage = () => {
  const { profileId } = useParams();
  const userId = useSelector((state: RootState) => state.user.id as number);
  const ref = useRef(null);

  const postsService = new PostsService();
  const profileService = new ProfileService();
  const subscriptionsService = new SubscriptionsService();
  const {
    loading: postsLoading,
    data: posts,
    setData: setPosts,
  } = useQuery((...args) => postsService.getUserPosts(Number(profileId), ...args), {
    pagination: {
      enabled: true,
      ref: ref,
    },
  });
  const {
    loading: profileLoading,
    data: profile,
    setData: setProfileData,
  } = useQuery(() => profileService.getProfile(Number(profileId)));

  const { mutate: publish } = useMutation((text: string) => postsService.createPost(text), {
    onSuccess: (newPost) => setPosts([newPost, ...posts]),
  });
  const { mutate: subscribe } = useMutation(() => subscriptionsService.subscribe(userId, +profileId), {
    onSuccess: () => setProfileData({ ...profile, isSubscribed: true, subscribers: profile.subscribers + 1 }),
  });
  const { mutate: unsubscribe } = useMutation(() => subscriptionsService.unsubsribe(userId, +profileId), {
    onSuccess: () => setProfileData({ ...profile, isSubscribed: false, subscribers: profile.subscribers - 1 }),
  });
  const { mutate: like } = useMutation((id: number) => postsService.like(id), {
    onSuccess: (updatedPost) =>
      setPosts(
        posts.map((post) => (post.id === updatedPost.postId ? { ...post, likes: post.likes + 1, liked: true } : post)),
      ),
  });
  const { mutate: dislike } = useMutation((id: number) => postsService.dislike(id), {
    onSuccess: (_updatedPost, args) =>
      setPosts(posts.map((post) => (post.id === args[0] ? { ...post, likes: post.likes - 1, liked: false } : post))),
  });

  const { mutate: deletePost } = useMutation((id: number) => postsService.deletePost(id), {
    onSuccess: (_result, args) => setPosts(posts.filter((post) => post.id !== args[0])),
  });

  const { mutate: updatePost } = useMutation(
    (id: number, newContent: string) => postsService.updatePost(id, newContent),
    {
      onSuccess: (_result, args) =>
        setPosts(posts.map((post) => (post.id === args[0] ? { ...post, text: args[1] } : post))),
    },
  );

  return (
    <div ref={ref}>
      {(postsLoading && !posts.length) || profileLoading ? (
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
              onDelete={deletePost}
              onUpdate={updatePost}
            />
          ))}
          {postsLoading && posts.length && <Loader />}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
