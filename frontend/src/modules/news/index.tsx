import { Post } from '@/components';
import { useQuery } from '@/hooks';
import { NewsService, PostsService } from '@/lib/service';
import { Loader } from '@/ui-kit';

const NewsPage = () => {
  const newsService = new NewsService();
  const postsService = new PostsService();
  const { data: posts, loading, setData: setPosts } = useQuery(() => newsService.getNews());

  const like = async (id: number) => {
    await postsService.like(id);
    setPosts(posts.map((post) => (post.id === id ? { ...post, likes: post.likes + 1, liked: true } : post)));
  };

  const dislike = async (id: number) => {
    await postsService.dislike(id);
    setPosts(posts.map((post) => (post.id === id ? { ...post, likes: post.likes - 1, liked: false } : post)));
  };

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
