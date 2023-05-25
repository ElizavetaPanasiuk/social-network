import { ApiProperty } from '@nestjs/swagger';
import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Post } from '../posts/models/post.model';
import { User } from '../users/models/user.model';
import { CommentLike } from './comment-like.model';

interface CommentCreationAttrs {
  readonly text: string;
  readonly postId: number;
  readonly userId: number;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttrs> {
  @ApiProperty({ example: 1, description: 'ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({
    example: 'Great thoughts!',
    description: 'Content of comment',
  })
  @Column({
    type: DataType.STRING(256),
    allowNull: false,
  })
  text: string;

  @ApiProperty({
    example: 1,
    description: 'Id of the post related to the comment',
  })
  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  postId: number;

  @ApiProperty({
    example: 2,
    description: 'Id of the user who is the author of the comment',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Post, {
    onDelete: 'CASCADE',
  })
  post: Post;

  @BelongsToMany(() => User, () => CommentLike)
  likes: User[];
}
