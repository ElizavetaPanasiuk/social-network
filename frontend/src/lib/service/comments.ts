import Service from './service';

class CommentsService extends Service {
  constructor() {
    super('comments');
  }

  getCommentsByPostId(postId: number) {
    return this.get({ postId });
  }

  createComment(text: string, postId: number) {
    return this.post({ text, postId });
  }

  like(commentId: number) {
    return this.post({ commentId }, '/like');
  }

  dislike(commentId: number) {
    return this.remove({ commentId }, '/dislike');
  }
}

export default CommentsService;
