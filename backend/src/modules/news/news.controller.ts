import {
  Controller,
  Get,
  Query,
  Request,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';
import { Post } from '@/posts/entities';

import { NewsService } from './news.service';

@ApiTags('News')
@Controller('news')
@UseGuards(AuthGuard)
export class NewsController {
  constructor(private newsService: NewsService) {}

  @ApiOperation({ summary: 'Get user news' })
  @ApiResponse({ status: 200, type: Array<Post> })
  @Get()
  getNews(@Request() req, @Query('page', ParseIntPipe) page: number) {
    const userId = req.user.id;
    return this.newsService.getNews(userId, page);
  }
}
