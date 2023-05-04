import Service from './service';

class NewsService extends Service {
  constructor() {
    super('news');
  }

  async getNews() {
    return await this.get();
  }
}

export default NewsService;
