import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Table, Model, HasMany } from 'sequelize-typescript';
import { Post } from '../../posts/models/post.model';
import { Subscription } from '../../subscriptions/models/subscription.model';

interface UserCreationAttrs {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
  readonly dateOfBirth: Date;
  readonly country: string;
  readonly city: string;
  readonly avatar: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({ example: 'Elizaveta', description: 'First name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({ example: 'Panasiuk', description: 'Last name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({ example: 'lizaveta.panasiuk@gmail.com', description: 'Email' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'password1111', description: 'Password' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: '2002-03-12 00:00:00+02',
    description: 'Date of birth',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateOfBirth: Date;

  @ApiProperty({ example: 'Belarus', description: ' Country' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  country: string;

  @ApiProperty({ example: 'Minsk', description: 'City' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  city: string;

  @ApiProperty({ example: 'TODO:ADD', description: 'Avatar' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Subscription)
  subscribers: Subscription[];

  @HasMany(() => Subscription)
  subscriptions: Subscription[];
}
