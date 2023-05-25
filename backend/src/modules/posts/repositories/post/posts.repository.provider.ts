import { Injectable, Provider } from '@nestjs/common';
import { PostsPgRepository } from './implementations/posts.pg.repository';
import { Post } from '../../models/post.model';
import { InjectModel } from '@nestjs/sequelize';

export function providePostsRepository(): Provider[] {
  return [
    {
      provide: 'posts-repository',
      useFactory: async (dependenciesProvider: PostsRepoDependenciesProvider) =>
        providePostsRepositoryFactory(dependenciesProvider),
      inject: [PostsRepoDependenciesProvider],
    },
    PostsRepoDependenciesProvider,
  ];
}

async function providePostsRepositoryFactory(
  dependenciesProvider: PostsRepoDependenciesProvider,
) {
  switch (process.env.DATASOURCE) {
    case 'postgres':
      return new PostsPgRepository(dependenciesProvider.pgRepository);
  }
}

@Injectable()
export class PostsRepoDependenciesProvider {
  constructor(
    @InjectModel(Post)
    public pgRepository: typeof Post,
  ) {}
}
