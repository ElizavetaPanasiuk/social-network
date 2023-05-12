import { Post } from '@/components';
import { useMutation, useQuery } from '@/hooks';
import { CommentsService, PostsService } from '@/lib/service';
import { useNavigate, useParams } from 'react-router-dom';
import { Comment } from './components';
import NewComment from './components/NewComment';
import { Loader } from '@/ui-kit';

const PostPage = () => {
  const postsService = new PostsService();
  const commentsService = new CommentsService();
  const navigate = useNavigate();
  const { postId } = useParams();
  
  const { loading, data: post, setData: setPost } = useQuery(() => postsService.getPost(postId));

  const {
    loading: loadingComments,
    data: comments,
    setData: setComments,
  } = useQuery(() => commentsService.getCommentsByPostId(Number(postId)));

  const { mutate: likePost } = useMutation(() => postsService.like(+postId), {
    onSuccess: () => setPost({ ...post, liked: true, likes: post.likes + 1 }),
  });

  const { mutate: dislikePost } = useMutation(() => postsService.dislike(+postId), {
    onSuccess: () => setPost({ ...post, liked: false, likes: post.likes - 1 }),
  });

  const { mutate: likeComment } = useMutation((commentId: number) => commentsService.like(commentId), {onSuccess: (_result, args) => setComments(
    comments.map((comment) =>
      comment.id === args[0] ? { ...comment, liked: true, likes: comment.likes + 1 } : comment,
    ),
  )});

  const { mutate: dislikeComment } = useMutation((commentId: number) => commentsService.dislike(commentId), {onSuccess: (_result, args) => setComments(
    comments.map((comment) =>
      comment.id === args[0] ? { ...comment, liked: false, likes: comment.likes - 1 } : comment,
    ),
  ) });

  const { mutate: publishComment } = useMutation((text: string) => commentsService.createComment(text, +postId), {
    onSuccess: (newComment) => setComments([newComment, ...comments]),
  });

  const {mutate: deletePost} = useMutation(() => postsService.deletePost(+postId), {onSuccess: () => {navigate(-1)}});

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
