import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ClothingSize } from './clothing-size.enum';

@Entity('clothing')
export class ClothingEntity {
  @ApiProperty({ description: 'Унікальний ідентифікатор', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Назва одягу', example: 'Футболка базова' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Категорія одягу', example: 'Футболки' })
  @Column()
  category: string;

  @ApiProperty({
    description: 'Розмір одягу',
    example: ClothingSize.L,
    enum: ClothingSize,
  })
  @Column({ type: 'varchar' })
  size: ClothingSize;

  @ApiProperty({ description: 'Ціна у гривнях', example: 799.99, type: Number })
  @Column('float')
  price: number;

  @ApiProperty({
    description: 'Опис товару',
    example: 'Бавовняна футболка',
    required: false,
  })
  @Column({ nullable: true })
  description?: string;
}
