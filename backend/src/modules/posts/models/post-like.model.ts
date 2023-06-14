import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '@/users/models/user.model';

import { Post } from './post.model';

interface PostLikeCreationAttrs {
  userId: number;
  postId: number;
}

@Table({ tableName: 'post-likes', updatedAt: false })
export class PostLike extends Model<PostLike, PostLikeCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Post like ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Post Id',
  })
  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  postId: number;

  @ApiProperty({
    example: 1,
    description: 'User Id',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}
