import { ApiOperation } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentLikeDto } from './dto/create-like.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Get comments to the post by post ID' })
  @Get(':postId')
  getComments(@Param('postId') postId: number) {
    return this.commentsService.getComments(postId);
  }

  @ApiOperation({ summary: 'Create comment to post' })
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: 'Update comment to post test by comment id' })
  @Put('id')
  updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete comment by comment id' })
  @Delete('id')
  deleteComment(@Param('id') id: number) {
    return this.commentsService.deleteComment(id);
  }

  @ApiOperation({ summary: 'Like comment' })
  @Post()
  likeComment(@Body() createLikeDto: CreateCommentLikeDto) {
    return this.commentsService.likeComment(createLikeDto);
  }

  @ApiOperation({ summary: 'Dislike comment' })
  @Delete()
  dislikeComment(@Body() createLikeDto: CreateCommentLikeDto) {
    return this.commentsService.dislikeCommnet(createLikeDto);
  }
}
