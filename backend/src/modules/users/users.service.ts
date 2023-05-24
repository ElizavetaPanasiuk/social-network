import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Op } from 'sequelize';
import { FilesService } from '../files/files.service';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository.interface';

const LIMIT = 10;

@Injectable()
export class UsersService {
  constructor(
    @Inject('users-repository') private usersRepository: UsersRepository,
    private filesService: FilesService,
  ) {}

  async getProfileById(id: number, currentUserId: number) {
    return this.usersRepository.getProfileDataById(id, currentUserId);
  }

  getUserById(
    id: number,
    attributes: Array<keyof User> = ['id', 'firstName', 'lastName', 'avatar'],
  ) {
    return this.usersRepository.getById(id, attributes);
  }

  async createUser(file: Express.Multer.File, dto: CreateUserDto) {
    dto.avatar = await this.filesService.createFile(file);
    const user = await this.usersRepository.create(dto);
    return user;
  }

  async getLoginData(email: string) {
    return this.usersRepository.getLoginData(email);
  }

  async getUserPasswordByEmail(email: string) {
    return this.usersRepository.getUserPasswordByEmail(email);
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
    return this.usersRepository.getSearchResult(searchParams, page, LIMIT);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteOne(id);
  }
}
