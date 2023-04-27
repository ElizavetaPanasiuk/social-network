import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/user.model';
import { Comment } from './comment.model';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [SequelizeModule.forFeature([Comment, User])],
})
export class CommentsModule {}
