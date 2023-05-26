import { WhereOptions } from 'sequelize';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateCommonProfileData } from '../dto/update-common-profile-data.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

export interface UsersRepository {
  getProfileDataById(id: number, currentUserId: number): Promise<User>;
  getById(id: number, attributes: Array<keyof User>): Promise<User>;
  create(dto: CreateUserDto): Promise<User>;
  getLoginData(email: string): Promise<User>;
  getUserPasswordByEmail(email: string): Promise<string>;
  getSearchResult(
    filters: WhereOptions<User>,
    page: number,
    limit: number,
  ): Promise<{ isLast: boolean; data: User[] }>;
  deleteOne(id: number): Promise<number>;
  updateOne(
    id: number,
    dto: UpdateCommonProfileData | UpdatePasswordDto,
  ): Promise<[affectedCount: number, affectedRows: Array<User>]>;
}
