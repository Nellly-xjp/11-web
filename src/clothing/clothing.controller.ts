import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClothingEntity } from './clothing.entity';
import { ClothingService } from './clothing.service';
import { CreateClothingDto } from './dto/create-clothing.dto';
import { UpdateClothingDto } from './dto/update-clothing.dto';

@ApiTags('Одяг та взуття')
@Controller('clothing')
export class ClothingController {
  constructor(private readonly clothingService: ClothingService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Створити одиницю одягу' })
  @ApiResponse({
    status: 201,
    description: 'Одиницю одягу створено',
    type: ClothingEntity,
  })
  @ApiResponse({ status: 400, description: 'Некоректні дані або розмір' })
  @ApiResponse({ status: 401, description: 'Необхідна автентифікація' })
  @ApiResponse({ status: 403, description: 'Недостатньо прав' })
  create(@Body() dto: CreateClothingDto): Promise<ClothingEntity> {
    return this.clothingService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Отримати список одягу' })
  @ApiResponse({
    status: 200,
    description: 'Список одягу',
    type: [ClothingEntity],
  })
  findAll(): Promise<ClothingEntity[]> {
    return this.clothingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати одиницю одягу за ID' })
  @ApiResponse({
    status: 200,
    description: 'Одиницю одягу знайдено',
    type: ClothingEntity,
  })
  @ApiResponse({ status: 400, description: 'Некоректний ідентифікатор' })
  @ApiResponse({ status: 404, description: 'Одиницю одягу не знайдено' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ClothingEntity> {
    return this.clothingService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Оновити одиницю одягу' })
  @ApiResponse({
    status: 200,
    description: 'Одиницю одягу оновлено',
    type: ClothingEntity,
  })
  @ApiResponse({ status: 400, description: 'Некоректні дані або розмір' })
  @ApiResponse({ status: 401, description: 'Необхідна автентифікація' })
  @ApiResponse({ status: 403, description: 'Недостатньо прав' })
  @ApiResponse({ status: 404, description: 'Одиницю одягу не знайдено' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateClothingDto,
  ): Promise<ClothingEntity> {
    return this.clothingService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Видалити одиницю одягу' })
  @ApiResponse({
    status: 200,
    description: 'Одиницю одягу видалено',
    type: ClothingEntity,
  })
  @ApiResponse({ status: 400, description: 'Некоректний ідентифікатор' })
  @ApiResponse({ status: 401, description: 'Необхідна автентифікація' })
  @ApiResponse({ status: 403, description: 'Недостатньо прав' })
  @ApiResponse({ status: 404, description: 'Одиницю одягу не знайдено' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<ClothingEntity> {
    return this.clothingService.remove(id);
  }
}
