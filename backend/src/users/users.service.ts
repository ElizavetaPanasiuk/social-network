import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id, {
      attributes: {
        exclude: ['email', 'password'],
      },
    });
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getLoginData(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      attributes: ['id', 'firstName', 'lastName'],
    });
    return user.dataValues;
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
      where: searchParams,
      order: [
        ['firstName', 'ASC'],
        ['lastName', 'ASC'],
      ],
      limit: size,
      offset: size * (page - 1),
    });
    return users;
  }
}
