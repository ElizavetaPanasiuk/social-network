import Service from './service';

class CommentsService extends Service {
  constructor() {
    super('comments');
  }

  async getCommentsByPostId(postId: number) {
    return await this.get({ postId });
  }

  async createComment(text: string, id: number, userId: number) {
    return await this.post({ text, postId: id, userId });
  }

  async like(userId: number, commentId: number) {
    return await this.post({ userId, commentId }, '/like');
  }

  async dislike(userId: number, commentId: number) {
    return await this.remove({ userId, commentId }, '/dislike');
  }
}

export default CommentsService;
