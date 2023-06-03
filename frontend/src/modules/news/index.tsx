import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { EmptyListMessage, PageWrapper, Post } from '@/components';
import { useMutation, useQuery } from '@/hooks';
import { PostInfo, QueryError } from '@/lib/global/types';
import { NewsService, PostsService } from '@/lib/service';

const NewsPage = () => {
  const { t } = useTranslation();
  const postsContainerRef = useRef<HTMLDivElement>(null);

  const newsService = new NewsService();
  const postsService = new PostsService();

  const {
    data: posts,
    loading,
    setData: setPosts,
    error,
  }: {
    data: PostInfo[];
    loading: boolean;
    setData: (updatedPosts: PostInfo[]) => void;
    error: QueryError;
  } = useQuery((page?: number) => newsService.getNews(page), {
    pagination: { enabled: true, ref: postsContainerRef as unknown as HTMLElement },
  });

  const { mutate: like } = useMutation((id: number) => postsService.like(id), {
    onSuccess: (_result, args) =>
      setPosts(posts.map((post) => (post.id === args[0] ? { ...post, likes: post.likes + 1, liked: true } : post))),
  });

  const { mutate: dislike } = useMutation((id: number) => postsService.dislike(id), {
    onSuccess: (_result, args) =>
      setPosts(posts.map((post) => (post.id === args[0] ? { ...post, likes: post.likes - 1, liked: false } : post))),
  });

  return (
    <PageWrapper
      loading={loading}
      error={error}
    >
      {!posts?.length ? (
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
      )}
    </PageWrapper>
  );
};

export default NewsPage;
