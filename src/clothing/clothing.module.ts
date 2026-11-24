import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothingController } from './clothing.controller';
import { ClothingEntity } from './clothing.entity';
import { ClothingService } from './clothing.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClothingEntity])],
  controllers: [ClothingController],
  providers: [ClothingService],
})
export class ClothingModule {}
