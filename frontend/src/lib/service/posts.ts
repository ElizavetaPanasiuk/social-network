import Service from './service';

class PostsService extends Service {
  constructor() {
    super('posts');
  }

  async getUserPosts(userId: number) {
    return await this.get({ userId });
  }

  async getPost(postId: number) {
    return await this.getById(postId);
  }

  async createPost(text: string) {
    return await this.post({ text });
  }

  async like(postId: number) {
    return await this.post({ postId }, '/like');
  }

  async dislike(postId: number) {
    return await this.remove({ postId }, '/dislike');
  }
}

export default PostsService;
