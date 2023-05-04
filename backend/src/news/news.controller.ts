import { NewsService } from './news.service';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @ApiOperation({ summary: 'Get user news' })
  @UseGuards(AuthGuard)
  @Get()
  getNews(@Request() req) {
    const userId = req.user.id;
    return this.newsService.getNews(userId);
  }
}
