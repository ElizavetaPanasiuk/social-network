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
  @Get('')
  getPostsByProfileId(@Query('userId') profileId: number, @Request() req) {
    return this.postsService.getPostsByProfileId(profileId, req.user.id);
  }

  @ApiOperation({ summary: 'Get post by id' })
  @UseGuards(AuthGuard)
  @Get(':id')
  getPostById(@Param('id') id: number, @Request() req) {
    return this.postsService.getPostById(id, req.user.id);
  }

  @ApiOperation({ summary: 'Create post' })
  //@ApiResponse
  @UseGuards(AuthGuard)
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @ApiOperation({ summary: 'Update post' })
  @UseGuards(AuthGuard)
  @Put(':id')
  updatePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Like post' })
  @UseGuards(AuthGuard)
  @Post('like')
  likePost(@Body() createLikeDto: CreatePostLikeDto) {
    return this.postsService.likePost(createLikeDto);
  }

  @ApiOperation({ summary: 'Dislike post' })
  @UseGuards(AuthGuard)
  @Delete('/dislike')
  dislikePost(@Body() dto: CreatePostLikeDto) {
    return this.postsService.dislikePost(dto);
  }

  @ApiOperation({ summary: 'Delete post' })
  //@ApiResponse({ status: 200, type: ok })
  @UseGuards(AuthGuard)
  @Delete(':id')
  removePost(@Param('id') id: number) {
    return this.postsService.removePost(id);
  }
}
