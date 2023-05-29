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
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';

import { PostsService } from './posts.service';
import { CreatePostDto, UpdatePostDto, PostLikeDto } from './dto';
import { PostLike, Post as PostEntity } from './entities';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Get posts by user id' })
  @ApiResponse({ status: 200, type: Array<PostEntity> })
  @UseGuards(AuthGuard)
  @Get('')
  getPostsByProfileId(
    @Query('userId', ParseIntPipe) profileId: number,
    @Query('page', ParseIntPipe) page: number,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.postsService.getPostsByProfileId(profileId, userId, page);
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiResponse({ status: 200, type: PostEntity })
  @UseGuards(AuthGuard)
  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.id;
    return this.postsService.getPostById(id, userId);
  }

  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 201, type: PostEntity })
  @UseGuards(AuthGuard)
  @Post()
  createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    createPostDto.userId = req.user.id;
    return this.postsService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({ status: 200 }) // add type
  @UseGuards(AuthGuard)
  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Like post' })
  @ApiResponse({ status: 201, type: PostLike })
  @UseGuards(AuthGuard)
  @Post('like')
  likePost(@Request() req, @Body() postLikeDto: PostLikeDto) {
    postLikeDto.userId = req.user.id;
    return this.postsService.likePost(postLikeDto);
  }

  @ApiOperation({ summary: 'Dislike post' })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(AuthGuard)
  @Delete('dislike')
  dislikePost(@Request() req, @Body() postLikeDto: PostLikeDto) {
    postLikeDto.userId = req.user.id;
    return this.postsService.dislikePost(postLikeDto);
  }

  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 200, type: Number })
  @UseGuards(AuthGuard)
  @Delete(':id')
  removePost(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.removePost(id);
  }
}
