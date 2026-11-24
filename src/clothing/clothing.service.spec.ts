import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClothingEntity } from './clothing.entity';
import { ClothingSize } from './clothing-size.enum';
import { ClothingService } from './clothing.service';

describe('ClothingService', () => {
  let service: ClothingService;
  const mockRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClothingService,
        {
          provide: getRepositoryToken(ClothingEntity),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ClothingService>(ClothingService);
  });

  it('creates and returns a clothing item', async () => {
    const dto = {
      name: 'Футболка',
      category: 'Футболки',
      size: ClothingSize.L,
      price: 799,
    };
    const clothing = { id: 1, ...dto };
    mockRepo.create.mockReturnValue(clothing);
    mockRepo.save.mockResolvedValue(clothing);

    await expect(service.create(dto)).resolves.toEqual(clothing);
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
    expect(mockRepo.save).toHaveBeenCalledWith(clothing);
  });

  it('returns a clothing item found by ID', async () => {
    const clothing = { id: 1, name: 'Футболка' };
    mockRepo.findOneBy.mockResolvedValue(clothing);

    await expect(service.findOne(1)).resolves.toBe(clothing);
    expect(mockRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('throws NotFoundException when an ID is not found', async () => {
    mockRepo.findOneBy.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('returns all clothing items', async () => {
    const clothing = [{ id: 1 }, { id: 2 }];
    mockRepo.find.mockResolvedValue(clothing);

    await expect(service.findAll()).resolves.toBe(clothing);
  });

  it('updates and returns a clothing item', async () => {
    const clothing = {
      id: 1,
      name: 'Футболка',
      size: ClothingSize.M,
      price: 799,
    };
    const dto = { size: ClothingSize.L };
    mockRepo.findOneBy.mockResolvedValue(clothing);
    mockRepo.save.mockImplementation(async (item) => item);

    await expect(service.update(1, dto)).resolves.toEqual({
      ...clothing,
      ...dto,
    });
    expect(mockRepo.save).toHaveBeenCalled();
  });

  it('removes and returns a clothing item', async () => {
    const clothing = { id: 1, name: 'Футболка' };
    mockRepo.findOneBy.mockResolvedValue(clothing);
    mockRepo.remove.mockResolvedValue(clothing);

    await expect(service.remove(1)).resolves.toBe(clothing);
    expect(mockRepo.remove).toHaveBeenCalledWith(clothing);
  });
});
