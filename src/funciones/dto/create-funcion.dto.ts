import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, Min } from 'class-validator';

export class CreateFuncionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idSala: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idPelicula: number;

  @ApiProperty({ example: '2026-12-01T19:30:00' })
  @IsDateString()
  fechaHora: string;

  @ApiProperty({ example: 35.5 })
  @IsNumber()
  @Min(0)
  precio: number;
}
