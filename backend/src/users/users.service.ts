import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';
import { Op, Sequelize } from 'sequelize';
import { FilesService } from '../files/files.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private filesService: FilesService,
  ) {}

  async getUserById(id: number) {
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

  async searchUsers(search = '', country = '', city = '', size = 10, page = 1) {
    let searchParams: { [key: string]: any } = {};

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
      where: searchParams, // TODO: exclude current user from the kust
      order: [
        ['firstName', 'ASC'],
        ['lastName', 'ASC'],
      ],
      limit: size,
      offset: size * (page - 1),
    });
    return users;
  }

  async deleteUser(id: number) {
    return this.userRepository.destroy({
      where: { id },
    });
  }
}
