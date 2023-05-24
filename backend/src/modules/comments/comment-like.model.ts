import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/models/user.model';
import { Comment } from './comment.model';

interface CommentLikeCreationAttrs {
  userId: number;
  commentId: number;
}

@Table({ tableName: 'comment-likes', updatedAt: false })
export class CommentLike extends Model<CommentLike, CommentLikeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
