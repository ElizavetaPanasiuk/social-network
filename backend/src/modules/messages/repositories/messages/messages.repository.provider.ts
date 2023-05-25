import { Injectable, Provider } from '@nestjs/common';
import { Message } from '../../models/message.model';
import { InjectModel } from '@nestjs/sequelize';
import { MessagesPgRepository } from './implementations/messages.pg.repository';

export function provideMessagesRepository(): Provider[] {
  return [
    {
      provide: 'messages-repository',
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
