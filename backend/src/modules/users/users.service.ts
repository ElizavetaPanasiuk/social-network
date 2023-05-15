import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Op, Sequelize } from 'sequelize';
import { FilesService } from '../files/files.service';

const LIMIT = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private filesService: FilesService,
  ) {}

  async getUserById(id: number, currentUserId: number) {
    const user = await this.userRepository.findByPk(id, {
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
    return user;
  }

  async createUser(file: Express.Multer.File, dto: CreateUserDto) {
    const avatar = await this.filesService.createFile(file);
    const user = await this.userRepository.create({ avatar, ...dto });
    return user;
  }

  async getLoginData(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      attributes: ['id', 'firstName', 'lastName'],
    });
    return user?.dataValues;
  }

  async getUserPasswordByEmail(email: string) {
    const { password } = await this.userRepository.findOne({
      where: {
        email,
      },
      attributes: {
        include: ['password'],
      },
    });

    return password;
  }

  async searchUsers(
    currentUserId: number,
    search: string | null = '',
    country: string | null = '',
    city: string | null = '',
    page: number | null = 1,
  ) {
    let searchParams: { [key: string]: any } = {
      id: {
        [Op.ne]: currentUserId,
      },
    };

    if (country) {
      searchParams.country = country;
    }
    if (city) {
      searchParams.city = city;
    }
    const [firstSubstr = '', secondSubstr = ''] = search
      .split(' ')
      .filter((el) => el)
      .map((el) => `%${el}%`);

    const substrChecks = [];
    if (firstSubstr) {
      substrChecks.push({ [Op.iLike]: firstSubstr });
    }
    if (secondSubstr) {
      substrChecks.push({ [Op.iLike]: secondSubstr });
    }

    if (substrChecks.length) {
      searchParams = {
        ...searchParams,
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
    const users = await this.userRepository.findAll({
      where: searchParams,
      order: [
        ['firstName', 'ASC'],
        ['lastName', 'ASC'],
      ],
      limit: LIMIT,
      offset: LIMIT * (page - 1),
    });
    return { isLast: users.length < LIMIT, data: users };
  }

  async deleteUser(id: number) {
    return this.userRepository.destroy({
      where: { id },
    });
  }
}
