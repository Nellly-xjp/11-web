import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClothingEntity } from './clothing.entity';
import { CreateClothingDto } from './dto/create-clothing.dto';
import { UpdateClothingDto } from './dto/update-clothing.dto';

@Injectable()
export class ClothingService {
  constructor(
    @InjectRepository(ClothingEntity)
    private readonly clothingRepository: Repository<ClothingEntity>,
  ) {}

  async create(dto: CreateClothingDto): Promise<ClothingEntity> {
    const clothing = this.clothingRepository.create(dto);
    return this.clothingRepository.save(clothing);
  }

  findAll(): Promise<ClothingEntity[]> {
    return this.clothingRepository.find();
  }

  async findOne(id: number): Promise<ClothingEntity> {
    const clothing = await this.clothingRepository.findOneBy({ id });
    if (!clothing) {
      throw new NotFoundException(`Clothing item with ID ${id} not found`);
    }
    return clothing;
  }

  async update(id: number, dto: UpdateClothingDto): Promise<ClothingEntity> {
    const clothing = await this.findOne(id);
    Object.assign(clothing, dto);
    return this.clothingRepository.save(clothing);
  }

  async remove(id: number): Promise<ClothingEntity> {
    const clothing = await this.findOne(id);
    return this.clothingRepository.remove(clothing);
  }
}
