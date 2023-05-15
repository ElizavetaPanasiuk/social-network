import Service from './service';

class NewsService extends Service {
  constructor() {
    super('news');
  }

  async getNews(page: number = 1) {
    return await this.get({ page });
  }
}

export default NewsService;
