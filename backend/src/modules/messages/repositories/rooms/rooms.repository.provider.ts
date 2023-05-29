import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Repository } from '@/constants/repositories';

import { Room } from '@/messages/models';
import { RoomsPgRepository } from './implementations/rooms.pg.repository';

export function provideRoomsRepository(): Provider[] {
  return [
    {
      provide: Repository.Rooms,
      useFactory: async (dependenciesProvider: RoomsRepoDependenciesProvider) =>
        provideRoomsRepositoryFactory(dependenciesProvider),
      inject: [RoomsRepoDependenciesProvider],
    },
    RoomsRepoDependenciesProvider,
  ];
}

async function provideRoomsRepositoryFactory(
  dependenciesProvider: RoomsRepoDependenciesProvider,
) {
  switch (process.env.DATASOURCE) {
    case 'postgres':
      return new RoomsPgRepository(dependenciesProvider.pgRepository);
  }
}

@Injectable()
export class RoomsRepoDependenciesProvider {
  constructor(
    @InjectModel(Room)
    public pgRepository: typeof Room,
  ) {}
}
