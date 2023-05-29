import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { EmptyListMessage, Post } from '@/components';
import { useMutation, useQuery } from '@/hooks';
import { PostInfo } from '@/lib/global/types';
import { NewsService, PostsService } from '@/lib/service';
import { Loader } from '@/ui-kit';

const NewsPage = () => {
  const { t } = useTranslation();
  const newsService = new NewsService();
  const postsService = new PostsService();
  const postsContainerRef = useRef<HTMLDivElement>(null);
  const {
    data: posts,
    loading,
    setData: setPosts,
  }: {
    data: PostInfo[];
    loading: boolean;
    setData: (updatedPosts: PostInfo[]) => void;
  } = useQuery((page?: number) => newsService.getNews(page), { pagination: { enabled: true, ref: postsContainerRef } });
  const { mutate: like } = useMutation((id: number) => postsService.like(id), {
    onSuccess: (result) =>
      setPosts(
        posts.map((post) => (post.id === result.postId ? { ...post, likes: post.likes + 1, liked: true } : post)),
      ),
  });
  const { mutate: dislike } = useMutation((id: number) => postsService.dislike(id), {
    onSuccess: (_result, args) =>
      setPosts(posts.map((post) => (post.id === args[0] ? { ...post, likes: post.likes - 1, liked: false } : post))),
  });

  return loading ? (
    <Loader />
  ) : !posts.length ? (
    <EmptyListMessage text={t('No news')} />
  ) : (
    <div ref={postsContainerRef}>
      {posts.map((post) => (
        <Post
          key={post.id}
          {...post}
          like={() => like(post.id)}
          dislike={() => dislike(post.id)}
        />
      ))}
    </div>
  );
};

export default NewsPage;
