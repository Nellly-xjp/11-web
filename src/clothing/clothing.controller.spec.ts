import { Test, TestingModule } from '@nestjs/testing';
import { ClothingController } from './clothing.controller';
import { ClothingEntity } from './clothing.entity';
import { ClothingSize } from './clothing-size.enum';
import { ClothingService } from './clothing.service';
import { CreateClothingDto } from './dto/create-clothing.dto';
import { UpdateClothingDto } from './dto/update-clothing.dto';

describe('ClothingController', () => {
  let controller: ClothingController;
  let service: jest.Mocked<
    Pick<
      ClothingService,
      'create' | 'findAll' | 'findOne' | 'update' | 'remove'
    >
  >;

  beforeEach(async () => {
    const mockService: jest.Mocked<
      Pick<
        ClothingService,
        'create' | 'findAll' | 'findOne' | 'update' | 'remove'
      >
    > = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClothingController],
      providers: [{ provide: ClothingService, useValue: mockService }],
    }).compile();

    controller = module.get<ClothingController>(ClothingController);
    service = module.get<typeof mockService>(ClothingService);
  });

  it('delegates create to the service', async () => {
    const dto: CreateClothingDto = {
      name: 'Футболка',
      category: 'Футболки',
      size: ClothingSize.L,
      price: 799,
    };
    const clothing: ClothingEntity = {
      id: 1,
      name: dto.name,
      category: dto.category,
      size: dto.size,
      price: dto.price,
    };
    service.create.mockResolvedValue(clothing);

    await expect(controller.create(dto)).resolves.toBe(clothing);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('delegates findAll to the service', async () => {
    const clothing: ClothingEntity[] = [
      {
        id: 1,
        name: 'Футболка',
        category: 'Футболки',
        size: ClothingSize.L,
        price: 799,
      },
    ];
    service.findAll.mockResolvedValue(clothing);

    await expect(controller.findAll()).resolves.toBe(clothing);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('delegates findOne to the service', async () => {
    const clothing: ClothingEntity = {
      id: 1,
      name: 'Футболка',
      category: 'Футболки',
      size: ClothingSize.L,
      price: 799,
    };
    service.findOne.mockResolvedValue(clothing);

    await expect(controller.findOne(1)).resolves.toBe(clothing);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('delegates update to the service', async () => {
    const dto: UpdateClothingDto = { name: 'Оновлена футболка' };
    const clothing: ClothingEntity = {
      id: 1,
      name: 'Оновлена футболка',
      category: 'Футболки',
      size: ClothingSize.L,
      price: 799,
    };
    service.update.mockResolvedValue(clothing);

    await expect(controller.update(1, dto)).resolves.toBe(clothing);
    expect(service.update).toHaveBeenCalledWith(1, dto);
  });

  it('delegates remove to the service', async () => {
    const clothing: ClothingEntity = {
      id: 1,
      name: 'Футболка',
      category: 'Футболки',
      size: ClothingSize.L,
      price: 799,
    };
    service.remove.mockResolvedValue(clothing);

    await expect(controller.remove(1)).resolves.toBe(clothing);
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
