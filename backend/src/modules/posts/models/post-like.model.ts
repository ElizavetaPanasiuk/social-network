import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { User } from '@/users/models/user.model';

import { Post } from './post.model';

interface PostLikeCreationAttrs {
  userId: number;
  postId: number;
}

@Table({ tableName: 'post-likes', updatedAt: false })
export class PostLike extends Model<PostLike, PostLikeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  postId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
