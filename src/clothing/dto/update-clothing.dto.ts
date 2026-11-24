import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ClothingSize } from '../clothing-size.enum';

export class UpdateClothingDto {
  @ApiPropertyOptional({
    description: 'Назва одиниці одягу',
    example: 'Футболка базова',
    type: String,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Категорія одягу',
    example: 'Футболки',
    type: String,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Розмір одягу з допустимого переліку',
    example: ClothingSize.L,
    type: String,
    enum: ClothingSize,
  })
  @IsOptional()
  @IsEnum(ClothingSize)
  size?: ClothingSize;

  @ApiPropertyOptional({
    description: 'Ціна у гривнях',
    example: 799.99,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Опис товару',
    example: 'Бавовняна футболка',
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
