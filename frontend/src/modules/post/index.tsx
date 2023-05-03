import { Post } from '@/components';
import { useQuery } from '@/hooks';
import { CommentsService, PostsService } from '@/lib/service';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Comment } from './components';
import NewComment from './components/NewComment';

const PostPage = () => {
  const postsService = new PostsService();
  const commentsService = new CommentsService();
  const { id } = useParams();
  const { loading, data: post, setData: setPost } = useQuery(() => postsService.getPost(id));
  const {
    loading: loadingComments,
    data: comments,
    setData: setComments,
  } = useQuery(() => commentsService.getCommentsByPostId(Number(id)));
  const userId = useSelector((state: RootState) => state.user.id as number);

  const likePost = async () => {
    await postsService.like(userId, id);
    setPost({ ...post, liked: true, likes: post.likes + 1 });
  };

  const dislikePost = async () => {
    await postsService.dislike(userId, id);
    setPost({ ...post, liked: false, likes: post.likes - 1 });
  };

  const likeComment = async (commentId: number) => {
    await commentsService.like(userId, commentId);
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, liked: true, likes: comment.likes + 1 } : comment,
      ),
    );
  };

  const dislikeComment = async (commentId: number) => {
    await commentsService.dislike(userId, commentId);
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, liked: false, likes: comment.likes - 1 } : comment,
      ),
    );
  };

  const publish = async (text: string) => {
    const newComment = await commentsService.createComment(text, id, userId);
    setComments([newComment, ...comments]);
  };

  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : (
        <Post
          {...post}
          like={likePost}
          dislike={dislikePost}
        />
      )}
      <NewComment publish={publish} />
      {loadingComments ? (
        <p>loading</p>
      ) : (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            {...comment}
            like={likeComment}
            dislike={dislikeComment}
          />
        ))
      )}
    </>
  );
};

export default PostPage;
