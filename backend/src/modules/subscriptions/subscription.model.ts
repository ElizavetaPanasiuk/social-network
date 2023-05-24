import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/models/user.model';

interface SubscriptionCreationAttrs {
  readonly subscriberId: number;
  readonly profileId: number;
}

@Table({ tableName: 'subscriptions' })
export class Subscription extends Model<
  Subscription,
  SubscriptionCreationAttrs
> {
  @ApiProperty({ example: 1, description: 'Subscription ID' })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Subscriber ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  subscriberId: number;

  @ApiProperty({
    example: 2,
    description: 'Profile on which subscriber subscribes',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  profileId: number;

  @BelongsTo(() => User, 'subscriberId')
  subscriber: User;

  @BelongsTo(() => User, 'profileId')
  profile: User;
}
