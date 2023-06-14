import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { FilesModule } from '@/files/files.module';
import { HashModule } from '@/hash/hash.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { provideUsersRepository } from './repositories/users.repository.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...provideUsersRepository()],
  imports: [SequelizeModule.forFeature([User]), FilesModule, HashModule],
  exports: [UsersService],
})
export class UsersModule {}
