import { Injectable, Provider } from '@nestjs/common';
import { Room } from '../../models/room.model';
import { InjectModel } from '@nestjs/sequelize';
import { RoomsPgRepository } from './implementations/rooms.pg.repository';

export function provideRoomsRepository(): Provider[] {
  return [
    {
      provide: 'rooms-repository',
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
