import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ClothingSize } from '../clothing-size.enum';

export class CreateClothingDto {
  @ApiProperty({
    description: 'Назва одиниці одягу',
    example: 'Футболка базова',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Категорія одягу',
    example: 'Футболки',
    type: String,
  })
  @IsString()
  category: string;

  @ApiProperty({
    description: 'Розмір одягу з допустимого переліку',
    example: ClothingSize.L,
    type: String,
    enum: ClothingSize,
  })
  @IsEnum(ClothingSize)
  size: ClothingSize;

  @ApiProperty({
    description: 'Ціна у гривнях',
    example: 799.99,
    type: Number,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    description: 'Опис товару',
    example: 'Бавовняна футболка',
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
