import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  UseGuards,
  Query,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';

import { CommentsService } from './comments.service';
import { CreateCommentDto, UpdateCommentDto, CommentLikeDto } from './dto';
import { Comment, CommentLike } from './entities';

@ApiTags('Comments')
@ApiBearerAuth('JWT-auth')
@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Get comments to the post by post ID' })
  @ApiResponse({ status: 200, type: Array<Comment> })
  @Get('')
  getComments(@Request() req, @Query('postId', ParseIntPipe) postId: number) {
    const userId = req.user.id;
    return this.commentsService.getComments(postId, userId);
  }

  @ApiOperation({ summary: 'Create comment to post' })
  @ApiResponse({ status: 201, type: Comment })
  @Post()
  createComment(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    createCommentDto.userId = req.user.id;
    return this.commentsService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: 'Update comment to post by comment id' })
  @ApiResponse({ status: 200 })
  @Put(':id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Dislike comment' })
  @ApiResponse({ status: 200, type: Number })
  @Delete('dislike')
  dislikeComment(@Request() req, @Body() commentLikeDto: CommentLikeDto) {
    commentLikeDto.userId = req.user.id;
    return this.commentsService.dislikeComment(commentLikeDto);
  }

  @ApiOperation({ summary: 'Delete comment by comment id' })
  @ApiResponse({ status: 200, type: Number })
  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.deleteComment(id);
  }

  @ApiOperation({ summary: 'Like comment' })
  @ApiResponse({ status: 201, type: CommentLike })
  @Post('like')
  likeComment(@Request() req, @Body() commentLikeDto: CommentLikeDto) {
    commentLikeDto.userId = req.user.id;
    return this.commentsService.likeComment(commentLikeDto);
  }
}
