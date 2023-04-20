import Service from "@/service";

class PostsService extends Service {
  constructor() {
    super("posts");
  }

  async getPostsByUserId(userId: number) {
    return await this.getById(userId);
  }

  async createPost(authorId: number, text: string) {
    return await this.post({ authorId, text });
  }

  async updatePost(id: number, text: string) {
    return await this.updateById(id, { text });
  }

  async removePost(id: number) {
    return await this.removeById(id);
  }
}

export default PostsService;
