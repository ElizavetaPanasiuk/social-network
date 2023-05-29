import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';

import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @ApiOperation({ summary: 'Get user news' })
  @UseGuards(AuthGuard)
  @Get()
  getNews(@Request() req, @Query('page', ParseIntPipe) page: number) {
    const userId = req.user.id;
    return this.newsService.getNews(userId, page);
  }
}
