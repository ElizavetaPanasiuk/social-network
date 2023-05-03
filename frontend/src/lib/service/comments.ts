import Service from './service';

class CommentsService extends Service {
  constructor() {
    super('comments');
  }

  async getCommentsByPostId(postId: number) {
    return await this.get({ postId });
  }

  async createComment(text: string, id: number) {
    return await this.post({ text, postId: id });
  }

  async like(commentId: number) {
    return await this.post({ commentId }, '/like');
  }

  async dislike(commentId: number) {
    return await this.remove({ commentId }, '/dislike');
  }
}

export default CommentsService;
