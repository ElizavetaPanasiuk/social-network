import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '@/users/models/user.model';

import { Room } from '.';

interface MessageCreationAttrs {
  readonly userId: number;
  readonly roomId: string;
  readonly text: string;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Message ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({ example: 'Hi!', description: 'Message text' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @ApiProperty({
    example: 'c7863489-b378-4e9c-b4e8-3e5407630eda',
    description: 'Room id',
  })
  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  roomId: string;

  @ApiProperty({ example: 1, description: 'Message author id' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => Room)
  room: Room;

  @BelongsTo(() => User)
  user: User;
}
