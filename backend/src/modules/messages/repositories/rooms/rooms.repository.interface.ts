import { CreateRoomDto } from '../../dto/create-room.dto';
import { Room } from '../../entities/room.entity';

export interface RoomsRepository {
  create(dto: CreateRoomDto): Promise<Room>;
  getById(id: string): Promise<Room>;
  getOneByUsersIds(userId1: number, userId2: number): Promise<Room>;
  getManyByUserId(userId: number): Promise<Array<Room>>;
}
