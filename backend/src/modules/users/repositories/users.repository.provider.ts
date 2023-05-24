import { Injectable, Provider } from '@nestjs/common';
import { UsersPgRepository } from './implementations/users.pg.repository';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';

export function provideUsersRepository(): Provider[] {
  return [
    {
      provide: 'users-repository',
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
