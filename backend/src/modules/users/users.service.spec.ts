import { Test } from '@nestjs/testing';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { FilesModule } from '../files/files.module';
import { HashModule } from '../hash/hash.module';

const testCat = { name: 'Test', age: 5, breed: 'Russian Blue' };

describe('CatsService', () => {
  let service: UsersService;
  let model: typeof User;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(() => [testCat]),
            findOne: jest.fn(),
            create: jest.fn(() => testCat),
            remove: jest.fn(),
          },
        },
      ],
      imports: [SequelizeModule.forFeature([User]), FilesModule, HashModule],
    }).compile();
    service = modRef.get(UsersService);
    model = modRef.get<typeof User>(getModelToken(User));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*   it('should get the cats', async () => {
    expect(await service.getCats()).toEqual([testCat]);
  });

  it('should add a cat', async () => {
    expect(
      await service.addCat({ name: 'Test', age: 5, breed: 'Russian Blue' }),
    ).toEqual(testCat);
  });

  it('should get a single cat', () => {
    const findSpy = jest.spyOn(model, 'findOne');
    expect(service.getCat('id'));
    expect(findSpy).toBeCalledWith({ where: { id: 'id' } });
  });

  it('should remove a cat', async () => {
    const destroyStub = jest.fn();
    const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
      destroy: destroyStub,
    } as any);
    const retVal = await service.removeCat('id');
    expect(findSpy).toBeCalledWith({ where: { id: 'id' } });
    expect(destroyStub).toBeCalledTimes(1);
    expect(retVal).toBeUndefined();
  }); */
});
