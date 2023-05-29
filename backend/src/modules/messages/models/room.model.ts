import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

import { User } from '@/users/models/user.model';

import { Message } from '.';

interface RoomCreationAttrs {
  id: string;
  userId1: number;
  userId2: number;
}

@Table({ tableName: 'rooms' })
export class Room extends Model<Room, RoomCreationAttrs> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    unique: true,
  })
  id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId1: number;

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
