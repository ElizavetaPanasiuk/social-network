import Service from './service';

class PostsService extends Service {
  constructor() {
    super('posts');
  }

  getUserPosts(userId: number, page: number) {
    return this.get({ userId, page });
  }

  getPost(postId: number) {
    return this.getById(postId);
  }

  createPost(text: string) {
    return this.post({ text });
  }

  like(postId: number) {
    return this.post({ postId }, '/like');
  }

  dislike(postId: number) {
    return this.remove({ postId }, '/dislike');
  }

  deletePost(postId: number) {
    return this.removeById(postId);
  }

  updatePost(postId: number, newText: string) {
    return this.updateById(postId, { text: newText });
  }
}

export default PostsService;
