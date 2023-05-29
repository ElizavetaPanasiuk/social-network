import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '@/users/models/user.model';

import { Message } from '.';

interface RoomCreationAttrs {
  id: string;
  userId1: number;
  userId2: number;
}

@Table({ tableName: 'rooms' })
export class Room extends Model<Room, RoomCreationAttrs> {
  @ApiProperty({
    example: 'c7863489-b378-4e9c-b4e8-3e5407630eda',
    description: 'Room id',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ApiProperty({ example: 1, description: 'User 1 id' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId1: number;

  @ApiProperty({ example: 2, description: 'User 2 id' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId2: number;

  @BelongsTo(() => User, 'userId1')
  user1: User;

  @BelongsTo(() => User, 'userId2')
  user2: User;

  @HasMany(() => Message)
  messages: Message[];
}
