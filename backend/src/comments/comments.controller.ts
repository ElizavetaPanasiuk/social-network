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
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentLikeDto } from './dto/create-like.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Get comments to the post by post ID' })
  @UseGuards(AuthGuard)
  @Get(':postId')
  getComments(@Param('postId') postId: number) {
    return this.commentsService.getComments(postId);
  }

  @ApiOperation({ summary: 'Create comment to post' })
  @UseGuards(AuthGuard)
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: 'Update comment to post by comment id' })
  @UseGuards(AuthGuard)
  @Put(':id')
  updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete comment by comment id' })
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteComment(@Param('id') id: number) {
    return this.commentsService.deleteComment(id);
  }

  @ApiOperation({ summary: 'Like comment' })
  @UseGuards(AuthGuard)
  @Post('like')
  likeComment(@Body() createLikeDto: CreateCommentLikeDto) {
    return this.commentsService.likeComment(createLikeDto);
  }

  @ApiOperation({ summary: 'Dislike comment' })
  @UseGuards(AuthGuard)
  @Delete('dislike/:id')
  dislikeComment(@Param('id') id: number) {
    return this.commentsService.dislikeCommnet(id);
  }
}
