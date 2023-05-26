import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { FilesModule } from '../files/files.module';
import { provideUsersRepository } from './repositories/users.repository.provider';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...provideUsersRepository()],
  imports: [SequelizeModule.forFeature([User]), FilesModule, AuthModule],
  exports: [UsersService],
})
export class UsersModule {}
