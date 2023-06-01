import { User } from '../entities/user.entity';
import {
  CreateUserDto,
  UpdateCommonProfileData,
  UpdatePasswordDto,
} from '../dto';

export interface UsersRepository {
  getProfileDataById(id: number, currentUserId: number): Promise<User>;
  getById(id: number, attributes: Array<keyof User>): Promise<User>;
  create(dto: CreateUserDto): Promise<User>;
  getLoginData(email: string): Promise<User>;
  getUserPasswordByEmail(email: string): Promise<string>;
  getSearchResult(
    searchParams: {
      currentUserId: number;
      country: string;
      city: string;
      substrChecks: string[];
    },
    page: number,
    limit: number,
  ): Promise<{ isLast: boolean; data: User[] }>;
  deleteOne(id: number): Promise<number>;
  updateOne(
    id: number,
    dto: UpdateCommonProfileData | UpdatePasswordDto | { avatar: string },
  ): Promise<[affectedCount: number, affectedRows: Array<User>]>;
}
