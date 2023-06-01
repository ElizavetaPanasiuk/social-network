import { Repository } from 'sequelize-typescript';
import { Sequelize, Op } from 'sequelize';

import { User as UserModel } from '@/users/models/user.model';
import { UsersRepository } from '../users.repository.interface';
import { User } from '@/users/entities/user.entity';
import {
  CreateUserDto,
  UpdateCommonProfileData,
  UpdatePasswordDto,
} from '@/users/dto';

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
    return this.usersRepository.findByPk(id, { attributes, raw: true });
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
      raw: true,
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
    searchParams: {
      currentUserId: number;
      country: string;
      city: string;
      substrChecks: string[];
    },
    page: number,
    limit: number,
  ) {
    const {
      currentUserId,
      country,
      city,
      substrChecks: [firstSubstr, secondSubstr],
    } = searchParams;

    let filters: { [key: string]: any } = {
      id: {
        [Op.ne]: currentUserId,
      },
    };

    if (country) {
      filters.country = country;
    }
    if (city) {
      filters.city = city;
    }
    const substrChecks = [];

    if (firstSubstr) {
      substrChecks.push({ [Op.iLike]: firstSubstr });
    }
    if (secondSubstr) {
      substrChecks.push({ [Op.iLike]: secondSubstr });
    }

    if (substrChecks.length) {
      filters = {
        ...filters,
        [Op.or]: [
          {
            firstName: {
              [Op.or]: substrChecks,
            },
          },
          {
            lastName: {
              [Op.or]: substrChecks,
            },
          },
        ],
      };
    }

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
