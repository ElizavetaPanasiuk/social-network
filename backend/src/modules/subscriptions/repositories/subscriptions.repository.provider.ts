import { Injectable, Provider } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subscription } from '../models/subscription.model';
import { SubscriptionsPgRepository } from './implementations/subscriptions.pg.repository';

export function provideSubscriptionsRepository(): Provider[] {
  return [
    {
      provide: 'subscriptions-repository',
      useFactory: async (
        dependenciesProvider: SubscriptionsRepoDependenciesProvider,
      ) => provideSubscriptionsRepositoryFactory(dependenciesProvider),
      inject: [SubscriptionsRepoDependenciesProvider],
    },
    SubscriptionsRepoDependenciesProvider,
  ];
}

async function provideSubscriptionsRepositoryFactory(
  dependenciesProvider: SubscriptionsRepoDependenciesProvider,
) {
  switch (process.env.DATASOURCE) {
    case 'postgres':
      return new SubscriptionsPgRepository(dependenciesProvider.pgRepository);
  }
}

@Injectable()
export class SubscriptionsRepoDependenciesProvider {
  constructor(
    @InjectModel(Subscription)
    public pgRepository: typeof Subscription,
  ) {}
}
