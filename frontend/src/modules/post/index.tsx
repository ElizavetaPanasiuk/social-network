import { Post } from '@/components';
import { useMutation, useQuery } from '@/hooks';
import { CommentsService, PostsService } from '@/lib/service';
import { useParams } from 'react-router-dom';
import { Comment } from './components';
import NewComment from './components/NewComment';
import { Loader } from '@/ui-kit';

const PostPage = () => {
  const postsService = new PostsService();
  const commentsService = new CommentsService();
  const { postId } = useParams();
  const { loading, data: post, setData: setPost } = useQuery(() => postsService.getPost(postId));
  const {
    loading: loadingComments,
    data: comments,
    setData: setComments,
  } = useQuery(() => commentsService.getCommentsByPostId(Number(postId)));

  const likePost = async () => {
    await postsService.like(postId);
    setPost({ ...post, liked: true, likes: post.likes + 1 });
  };

  const dislikePost = async () => {
    await postsService.dislike(postId);
    setPost({ ...post, liked: false, likes: post.likes - 1 });
  };

  const likeComment = async (commentId: number) => {
    await commentsService.like(commentId);
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, liked: true, likes: comment.likes + 1 } : comment,
      ),
    );
  };

  const dislikeComment = async (commentId: number) => {
    await commentsService.dislike(commentId);
    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, liked: false, likes: comment.likes - 1 } : comment,
      ),
    );
  };

  const { mutate: publishComment } = useMutation((text: string) => commentsService.createComment(text, postId), {
    onSuccess: (newComment) => setComments([newComment, ...comments]),
  });

  const deletePost = async () => {
    const res = await postsService.deletePost(id);
    console.log(res);
  };

  return loading || loadingComments ? (
    <Loader />
  ) : (
    <>
      <Post
        {...post}
        like={likePost}
        dislike={dislikePost}
        onDelete={deletePost}
      />
      <NewComment publish={publishComment} />
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          {...comment}
          like={likeComment}
          dislike={dislikeComment}
        />
      ))}
    </>
  );
};

export default PostPage;
