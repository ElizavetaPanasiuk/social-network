import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Repository } from '@/lib/enums/repositories';

import { UsersPgRepository } from './implementations/users.pg.repository';
import { User } from '../models/user.model';

export function provideUsersRepository(): Provider[] {
  return [
    {
      provide: Repository.Users,
      useFactory: async (dependenciesProvider: UsersRepoDependenciesProvider) =>
        provideUsersRepositoryFactory(dependenciesProvider),
      inject: [UsersRepoDependenciesProvider],
    },
    UsersRepoDependenciesProvider,
  ];
}

async function provideUsersRepositoryFactory(
  dependenciesProvider: UsersRepoDependenciesProvider,
) {
  switch (process.env.DATASOURCE) {
    case 'postgres':
      return new UsersPgRepository(dependenciesProvider.pgRepository);
  }
}

@Injectable()
export class UsersRepoDependenciesProvider {
  constructor(
    @InjectModel(User)
    public pgRepository: typeof User,
  ) {}
}
