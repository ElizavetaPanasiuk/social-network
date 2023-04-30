import Service from "./service";

class PostsService extends Service {
  constructor() {
    super("posts");
  }

  async getUserPosts(userId: number) {
    return await this.get({ userId });
  }

  async like(userId: number, postId: number) {
    return await this.post({ userId, postId }, "/like");
  }

  async dislike() {}
}

export default PostsService;
