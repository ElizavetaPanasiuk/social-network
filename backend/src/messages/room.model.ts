import { RouteInfo } from '@nestjs/common/interfaces';
import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { Message } from './message.model';

interface RoomCreationAttrs {
  id: number;
  userId1: number;
  userId2: number;
}

@Table({ tableName: 'rooms' })
export class Room extends Model<Room, RouteInfo> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

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

  @BelongsTo(() => User)
  user1: User;

  @BelongsTo(() => User)
  user2: User;

  @HasMany(() => Message)
  messages: Message[];
}
