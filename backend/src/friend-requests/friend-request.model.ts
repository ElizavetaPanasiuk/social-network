import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/user.model';

interface FriendRequestCreationAttrs {
  readonly receiverId: number;
  readonly requesterId: number;
  readonly status: 'pending' | 'declined' | 'approved';
}

@Table({ tableName: 'friendRequests' })
export class FriendRequest extends Model<
  FriendRequest,
  FriendRequestCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({ example: 'pending', description: 'Request status' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: 'pending' | 'declined' | 'approved';

  @ApiProperty({
    example: 1,
    description: 'ID of the user who makes q request to friends',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  requestorId: number;

  @ApiProperty({
    example: 2,
    description:
      'ID of the user who receives a request to friends and declines or approves it',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  requesteeId: number;

  @BelongsTo(() => User, 'requestorId')
  requestor: User;

  @BelongsTo(() => User, 'requesteeId')
  requestee: User;
}
