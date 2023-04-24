import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.model';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User]), FilesModule],
  exports: [UsersService],
})
export class UsersModule {}
