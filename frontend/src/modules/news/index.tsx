import { Post } from '@/components';
import { useQuery } from '@/hooks';
import { NewsService } from '@/lib/service';
import { Loader } from '@/ui-kit';

const NewsPage = () => {
  const newsService = new NewsService();
  const { data: posts, loading } = useQuery(() => newsService.getNews());

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        posts.map((post) => (
          <Post
            key={post.id}
            {...post}
          />
        ))
      )}
    </div>
  );
};

export default NewsPage;
