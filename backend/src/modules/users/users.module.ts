import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { FilesModule } from '../files/files.module';
import { provideUsersRepository } from './repositories/users.repository.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...provideUsersRepository()],
  imports: [SequelizeModule.forFeature([User]), FilesModule],
  exports: [UsersService],
})
export class UsersModule {}
