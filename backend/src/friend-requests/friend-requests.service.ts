import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FriendRequest } from './friend-request.model';
import { CreateFriendRequestDto } from './create-friend-request.dto';
import { Op } from 'sequelize';
import { User } from 'src/users/user.model';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectModel(FriendRequest)
    private friendRequestsRepository: typeof FriendRequest,
  ) {}

  async createRequest(dto: CreateFriendRequestDto) {
    const { requestorId, requesteeId } = dto;
    const request = await this.friendRequestsRepository.findOne({
      where: {
        [Op.or]: [
          { [Op.and]: [{ requestorId }, { requesteeId }] },
          {
            [Op.and]: [
              { requestorId: requesteeId },
              { requesteeId: requestorId },
            ],
          },
        ],
      },
    });
    if (request) {
      throw new HttpException(
        'Request for this pair of users already exist',
        HttpStatus.CONFLICT,
      );
    }
    return await this.friendRequestsRepository.create({
      ...dto,
      status: 'pending',
    });
  }

  async approveRequest(requestId: number) {
    return await this.friendRequestsRepository.update(
      { status: 'approved' },
      {
        where: {
          id: requestId,
        },
      },
    );
  }

  async declineRequest(requestId: number) {
    return await this.friendRequestsRepository.update(
      { status: 'declined' },
      {
        where: {
          id: requestId,
        },
      },
    );
  }

  async getRequestsInited(userId: number) {
    return await this.friendRequestsRepository.findAll({
      where: {
        requestorId: userId,
        status: 'pending',
      },
    });
  }

  async getRequestsReceived(userId: number) {
    return await this.friendRequestsRepository.findAll({
      where: {
        requesteeId: userId,
        status: 'pending',
      },
    });
  }

  async getFriendsByUserId(userId: number) {
    return await this.friendRequestsRepository.findAll({
      where: {
        [Op.or]: [{ requestorId: userId }, { requesteeId: userId }],
        status: 'approved',
      },
      include: [
        {
          model: User,
          as: 'requestor',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'requestee',
          attributes: ['id'],
        },
      ],
    });
  }
}
