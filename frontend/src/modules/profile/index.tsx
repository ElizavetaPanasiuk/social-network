import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Post } from '@/components';
import { useMutation, useQuery } from '@/hooks';
import { MessagesService, PostsService, ProfileService, SubscriptionsService } from '@/lib/service';
import { PostInfo } from '@/lib/global/types';
import { RootState } from '@/store';
import { Loader } from '@/ui-kit';

import { ProfileInfo, NewPost } from './components';

const ProfilePage = () => {
  const params = useParams();
  const profileId = Number(params.profileId);
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.id as number);
  const ref = useRef<HTMLDivElement>(null);

  const postsService = new PostsService();
  const profileService = new ProfileService();
  const subscriptionsService = new SubscriptionsService();
  const messagesService = new MessagesService();

  const {
    loading: postsLoading,
    data: posts,
    setData: setPosts,
  }: {
    loading: boolean;
    data: PostInfo[];
    setData: (updatedPosts: PostInfo[]) => void;
  } = useQuery((page?: number) => postsService.getUserPosts(Number(profileId), page), {
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

  const { mutate: publish, loading: createPostLoading } = useMutation((text: string) => postsService.createPost(text), {
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

  const { mutate: updatePost, loading: updatePostLoading } = useMutation(
    (id: number, newContent: string) => postsService.updatePost(id, newContent),
    {
      onSuccess: (_result, args) =>
        setPosts(posts.map((post) => (post.id === args[0] ? { ...post, text: args[1] } : post))),
    },
  );

  const { mutate: startMessaging } = useMutation(() => messagesService.createRoom(+profileId), {
    onSuccess: (result) => {
      const { id } = result;
      navigate(`/messages/${id}`);
    },
  });

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
            startMessaging={startMessaging}
          />
          {+profileId === userId && (
            <NewPost
              publish={publish}
              loading={createPostLoading}
            />
          )}
          {posts.map((post) => (
            <Post
              key={post.id}
              {...post}
              like={like}
              dislike={dislike}
              onDelete={deletePost}
              onUpdate={updatePost}
              loading={updatePostLoading}
            />
          ))}
          {postsLoading && posts.length && <Loader />}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
