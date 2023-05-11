import { Post } from '@/components';
import { useMutation, useQuery } from '@/hooks';
import { NewsService, PostsService } from '@/lib/service';
import { Loader } from '@/ui-kit';

const NewsPage = () => {
  const newsService = new NewsService();
  const postsService = new PostsService();
  const { data: posts, loading, setData: setPosts } = useQuery(() => newsService.getNews());
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

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            {...post}
            like={() => like(post.id)}
            dislike={() => dislike(post.id)}
          />
        ))
      )}
    </div>
  );
};

export default NewsPage;
