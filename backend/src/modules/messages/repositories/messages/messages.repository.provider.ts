import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Repository } from '@/lib/enums/repositories';

import { Message } from '@/messages/models';
import { MessagesPgRepository } from './implementations/messages.pg.repository';

export function provideMessagesRepository(): Provider[] {
  return [
    {
      provide: Repository.Messages,
      useFactory: async (
        dependenciesProvider: MessagesRepoDependenciesProvider,
      ) => provideMessagesRepositoryFactory(dependenciesProvider),
      inject: [MessagesRepoDependenciesProvider],
    },
    MessagesRepoDependenciesProvider,
  ];
}

async function provideMessagesRepositoryFactory(
  dependenciesProvider: MessagesRepoDependenciesProvider,
) {
  switch (process.env.DATASOURCE) {
    case 'postgres':
      return new MessagesPgRepository(dependenciesProvider.pgRepository);
  }
}

@Injectable()
export class MessagesRepoDependenciesProvider {
  constructor(
    @InjectModel(Message)
    public pgRepository: typeof Message,
  ) {}
}
