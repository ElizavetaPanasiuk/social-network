import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';

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
}
