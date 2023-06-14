import { Inject, Injectable } from '@nestjs/common';

import { HashService } from '@/hash/hash.service';
import { FilesService } from '@/files/files.service';
import { Repository } from '@/lib/enums/repositories';

import {
  CreateUserDto,
  UpdatePasswordDto,
  UpdateCommonProfileData,
} from './dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository.interface';

const LIMIT = 10;

@Injectable()
export class UsersService {
  constructor(
    @Inject(Repository.Users) private usersRepository: UsersRepository,
    private filesService: FilesService,
    private hashService: HashService,
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
    dto.avatar = await this.filesService.createFile(file, 'images');
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
    const searchParams = {
      country,
      city,
      currentUserId,
      substrChecks: [],
    };

    const [firstSubstr = '', secondSubstr = ''] = search
      .split(' ')
      .filter((el) => el)
      .map((el) => `%${el}%`);

    searchParams.substrChecks = [firstSubstr, secondSubstr];

    return this.usersRepository.getSearchResult(searchParams, page, LIMIT);
  }

  deleteUser(id: number) {
    return this.usersRepository.deleteOne(id);
  }

  updateCommonProfileData(id: number, dto: UpdateCommonProfileData) {
    return this.usersRepository.updateOne(id, dto);
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const { password: passwordHash } = await this.usersRepository.getById(id, [
      'password',
    ]);
    const isMatch = await this.hashService.matchPassword(
      dto.password,
      passwordHash,
    );
    dto.password = await this.hashService.hashPassword(dto.password);

    if (isMatch) {
      throw new Error(
        'New password is the same as previous. Create a new password.',
      );
    }

    return this.usersRepository.updateOne(id, dto);
  }

  async updateAvatar(id: number, file: Express.Multer.File) {
    const avatar = await this.filesService.createFile(file, 'images');
    const { avatar: userPreviousAvatar } = await this.getUserById(id, [
      'avatar',
    ]);
    await this.filesService.removeFile(userPreviousAvatar);
    return this.usersRepository.updateOne(id, { avatar });
  }
}
