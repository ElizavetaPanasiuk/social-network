import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePostLikeDto } from './dto/create-like.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Get posts by user id' })
  @ApiResponse({ status: 200, type: Post })
  @UseGuards(AuthGuard)
  @Get(':userId')
  getPostsByUserId(@Param('userId') userId: number) {
    return this.postsService.getPostsByUserId(userId);
  }

  @ApiOperation({ summary: 'Create post' })
  //@ApiResponse
  @UseGuards(AuthGuard)
  @Post()
  createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Update post' })
  @UseGuards(AuthGuard)
  @Put(':id')
  updatePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Delete post' })
  //@ApiResponse({ status: 200, type: ok })
  @UseGuards(AuthGuard)
  @Delete(':id')
  removePost(@Param('id') id: number) {
    return this.postsService.removePost(id);
  }

  @ApiOperation({ summary: 'Like post' })
  @Post('like')
  likePost(@Body() createLikeDto: CreatePostLikeDto) {
    return this.postsService.likePost(createLikeDto);
  }

  @ApiOperation({ summary: 'Dislike post' })
  @Delete('dislike/:id')
  dislikePost(@Param('id') id: number) {
    return this.postsService.dislikePost(id);
  }
}
