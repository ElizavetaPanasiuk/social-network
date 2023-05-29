import { CreateRoomDto } from '@/messages/dto';
import { Room } from '@/messages/entities';

export interface RoomsRepository {
  create(dto: CreateRoomDto): Promise<Room>;
  getById(id: string): Promise<Room>;
  getOneByUsersIds(userId1: number, userId2: number): Promise<Room>;
  getManyByUserId(userId: number): Promise<Array<Room>>;
}
