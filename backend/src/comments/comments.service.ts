import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}

  async getComments(postId: number) {
    return await this.commentRepository.findAll({
      where: {
        postId,
      },
    });
  }

  async createComment(dto: CreateCommentDto) {
    return await this.commentRepository.create(dto);
  }

  async updateComment(id: number, dto: UpdateCommentDto) {
    return await this.commentRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
  }

  async deleteComment(id: number) {
    return this.commentRepository.destroy({
      where: {
        id,
      },
    });
  }
}
