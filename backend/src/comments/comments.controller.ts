import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
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
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentLikeDto } from './dto/comment-like.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Get comments to the post by post ID' })
  @UseGuards(AuthGuard)
  @Get('')
  getComments(@Request() req, @Query('postId', ParseIntPipe) postId: number) {
    const userId = req.user.id;
    return this.commentsService.getComments(postId, userId);
  }

  @ApiOperation({ summary: 'Create comment to post' })
  @UseGuards(AuthGuard)
  @Post()
  createComment(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    createCommentDto.userId = req.user.id;
    return this.commentsService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: 'Update comment to post by comment id' })
  @UseGuards(AuthGuard)
  @Put(':id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete comment by comment id' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.deleteComment(id);
  }

  @ApiOperation({ summary: 'Like comment' })
  @UseGuards(AuthGuard)
  @Post('like')
  likeComment(@Request() req, @Body() commentLikeDto: CommentLikeDto) {
    commentLikeDto.userId = req.user.id;
    return this.commentsService.likeComment(commentLikeDto);
  }

  @ApiOperation({ summary: 'Dislike comment' })
  @UseGuards(AuthGuard)
  @Delete('dislike')
  dislikeComment(@Request() req, @Body() commentLikeDto: CommentLikeDto) {
    commentLikeDto.userId = req.user.id;
    return this.commentsService.dislikeComment(commentLikeDto);
  }
}
