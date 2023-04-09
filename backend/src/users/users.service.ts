import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepostory: typeof User) {}

  async getById(id: number) {
    const user = await this.userRepostory.findByPk(id, {
      attributes: {
        exclude: ['email', 'password'],
      },
    });
    return user;
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepostory.create(dto);
    return user;
  }
}
