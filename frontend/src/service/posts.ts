import Service from "./service";

class PostsService extends Service {
  constructor() {
    super("posts");
  }

  async getUserPosts(userId: number) {
    return await this.get({ userId });
  }

  async createPost(authorId: number, text: string) {
    return await this.post({ authorId, text });
  }

  async like(userId: number, postId: number) {
    return await this.post({ userId, postId }, "/like");
  }

  async dislike(userId: number, postId: number) {
    return await this.remove({ userId, postId }, "/dislike");
  }
}

export default PostsService;
