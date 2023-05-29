import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '@/users/models/user.model';

import { Comment } from './comment.model';

interface CommentLikeCreationAttrs {
  userId: number;
  commentId: number;
}

@Table({ tableName: 'comment-likes', updatedAt: false })
export class CommentLike extends Model<CommentLike, CommentLikeCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Like ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Comment ID' })
  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentId: number;

  @ApiProperty({ example: 1, description: 'User ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
