import Service from './service';

class NewsService extends Service {
  constructor() {
    super('news');
  }

  getNews(page: number = 1) {
    return this.get({ page });
  }
}

export default NewsService;
