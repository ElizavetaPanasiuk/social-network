import { SubscriptionsService } from '../subscriptions/subscriptions.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';

import { Post } from '@/posts/models';
import { User } from '@/users/models/user.model';

const LIMIT = 10;

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private subscriptionsService: SubscriptionsService,
  ) {}

  async getNews(userId: number, page: number) {
    // TODO: make in one query
    const subscriptions = await this.subscriptionsService.getSubscriptionsIds(
      userId,
    );

    if (!subscriptions.length) {
      return { isLast: true, data: [] };
    }
    const posts = await this.postRepository.findAll({
      where: {
        userId: { [Op.or]: subscriptions },
      },
      limit: LIMIT,
      offset: LIMIT * (page - 1),
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
    return { isLast: posts.length < LIMIT, data: posts };
  }
}
