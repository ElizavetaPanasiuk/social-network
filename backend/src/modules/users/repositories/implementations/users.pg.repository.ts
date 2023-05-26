import { Repository } from 'sequelize-typescript';
import { Sequelize, WhereOptions } from 'sequelize';
import { User as UserModel } from '../../models/user.model';
import { UsersRepository } from '../users.repository.interface';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { UpdateCommonProfileData } from '../../dto/update-common-profile-data.dto';
import { UpdatePasswordDto } from '../../dto/update-password.dto';

export class UsersPgRepository implements UsersRepository {
  constructor(private usersRepository: Repository<UserModel>) {}

  getProfileDataById(id: number, currentUserId: number) {
    return this.usersRepository.findByPk(id, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'country',
        'city',
        'dateOfBirth',
        'avatar',
        ['createdAt', 'joined'],
        [
          Sequelize.literal(`(
        SELECT COUNT(*)::int
          FROM "subscriptions"
          WHERE "subscriberId" = "User"."id"
      )`),
          'subscriptions',
        ],
        [
          Sequelize.literal(`(
        SELECT COUNT(*)::int
          FROM "subscriptions"
          WHERE "profileId" = "User"."id"
      )`),
          'subscribers',
        ],
        [
          Sequelize.literal(`(
        SELECT
          CASE
          WHEN EXISTS(
            SELECT 1
            FROM "subscriptions"
            WHERE
              "profileId" = ${id}
              AND
              "subscriberId" = ${currentUserId}
          )
          THEN TRUE
          ELSE FALSE
        END
      )`),
          'isSubscribed',
        ],
      ],
    });
  }

  getById(
    id: number,
    attributes: Array<keyof User> = ['id', 'firstName', 'lastName', 'avatar'],
  ) {
    return this.usersRepository.findByPk(id, { attributes });
  }

  create(dto: CreateUserDto) {
    return this.usersRepository.create(dto);
  }

  getLoginData(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
      attributes: ['id', 'firstName', 'lastName'],
    });
  }

  async getUserPasswordByEmail(email: string) {
    const { password } = await this.usersRepository.findOne({
      where: {
        email,
      },
      attributes: {
        include: ['password'],
      },
    });

    return password;
  }

  async getSearchResult(
    filters: WhereOptions<User>,
    page: number,
    limit: number,
  ) {
    const users = await this.usersRepository.findAll({
      where: filters,
      order: [
        ['firstName', 'ASC'],
        ['lastName', 'ASC'],
      ],
      limit,
      offset: limit * (page - 1),
    });
    return { isLast: users.length < limit, data: users };
  }

  deleteOne(id: number) {
    return this.usersRepository.destroy({
      where: { id },
    });
  }

  updateOne(id: number, dto: UpdateCommonProfileData | UpdatePasswordDto) {
    return this.usersRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
  }
}
