import { Repository, Sequelize } from 'sequelize-typescript';
import { PostsRepopository } from '../posts.repository.interface';
import { Post } from '../../../models/post.model';
import { UpdatePostDto } from '../../../dto/update-post.dto';
import { CreatePostDto } from '../../../dto/create-post.dto';
import { User } from 'src/modules/users/models/user.model';

export class PostsPgRepository implements PostsRepopository {
  constructor(private postsRepository: Repository<Post>) {}

  getManyByProfileId(
    profileId: number,
    userId: number,
    page: number,
    limit: number,
  ) {
    return this.postsRepository.findAll({
      where: {
        userId: profileId,
      },
      limit: limit,
      offset: limit * (page - 1),
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)::int
                FROM "post-likes"
                WHERE "postId" = "Post"."id"
            )`),
            'likes',
          ],
          [
            Sequelize.literal(`(
              SELECT COUNT(*)::int
                FROM comments
                WHERE "postId" = "Post"."id"
            )`),
            'comments',
          ],
          [
            Sequelize.literal(`(
              SELECT 
                CASE 
                WHEN EXISTS(
                  SELECT 1 
                  FROM "post-likes" 
                  WHERE 
                    "postId" = "Post"."id"
                    AND
                    "userId" = ${userId}
                )
                THEN TRUE
                ELSE FALSE
              END
            )`),
            'liked',
          ],
        ],
        exclude: ['updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'avatar'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  getById(id: number, userId: number) {
    return this.postsRepository.findByPk(id, {
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)::int
                FROM "post-likes"
                WHERE
                  "postId" = ${id}
            )`),
            'likes',
          ],
          [
            Sequelize.literal(`(
              SELECT COUNT(*)::int
                FROM comments
                WHERE
                  "postId" = ${id}
            )`),
            'comments',
          ],
          [
            Sequelize.literal(`(
              SELECT 
                CASE 
                WHEN EXISTS(
                  SELECT 1 
                  FROM "post-likes" 
                  WHERE 
                    "postId" = ${id}
                    AND
                    "userId" = ${userId}
                )
                THEN TRUE
                ELSE FALSE
              END
            )`),
            'liked',
          ],
        ],
        exclude: ['updatedAt'],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName', 'avatar'],
        },
      ],
    });
  }

  create(dto: CreatePostDto) {
    return this.postsRepository.create(dto);
  }

  updateOne(id: number, dto: UpdatePostDto) {
    return this.postsRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
  }

  deleteOne(id: number) {
    return this.postsRepository.destroy({
      where: {
        id,
      },
    });
  }
}
