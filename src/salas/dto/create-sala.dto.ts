import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateSalaDto {
  @ApiProperty({ example: 'Sala 1' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 50 })
  @IsInt()
  @Min(1)
  capacidad: number;

  @ApiProperty({ example: '3D', enum: ['2D', '3D', 'IMAX'] })
  @IsIn(['2D', '3D', 'IMAX'])
  tipo: string;
}
