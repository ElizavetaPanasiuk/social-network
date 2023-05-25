import { Repository } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { Room } from 'src/modules/messages/models/room.model';
import { RoomsRepository } from '../rooms.repository.interface';
import { CreateRoomDto } from 'src/modules/messages/dto/create-room.dto';
import { User } from 'src/modules/users/models/user.model';

export class RoomsPgRepository implements RoomsRepository {
  constructor(private roomsRepository: Repository<Room>) {}

  create(dto: CreateRoomDto) {
    return this.roomsRepository.create(dto);
  }

  getById(id: string) {
    return this.roomsRepository.findOne({
      where: {
        id,
      },
    });
  }

  getOneByUsersIds(userId1: number, userId2: number) {
    return this.roomsRepository.findOne({
      where: {
        userId1: {
          [Op.or]: [userId1, userId2],
        },
        userId2: {
          [Op.or]: [userId1, userId2],
        },
      },
    });
  }

  getManyByUserId(userId: number) {
    return this.roomsRepository.findAll({
      where: {
        [Op.or]: [{ userId1: userId }, { userId2: userId }],
      },
      include: [
        {
          model: User,
          as: 'user1',
          attributes: ['id', 'firstName', 'lastName', 'avatar'],
        },
        {
          model: User,
          as: 'user2',
          attributes: ['id', 'firstName', 'lastName', 'avatar'],
        },
      ],
    });
  }
}
