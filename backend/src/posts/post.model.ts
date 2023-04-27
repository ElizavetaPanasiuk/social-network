import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../users/user.model';
import { PostLike } from './post-like.model';

interface PostCreationAttrs {
  readonly text: string;
  readonly userId: number;
  readonly photo: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({ example: 'My first post', description: 'Post text content' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  text: string;

  @ApiProperty({
    example: 1,
    description: 'Author ID (from users table)',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @BelongsToMany(() => User, () => PostLike)
  likes: User[];
}
