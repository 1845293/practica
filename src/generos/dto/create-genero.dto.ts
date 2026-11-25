import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGeneroDto {
  @ApiProperty({ example: 'Ciencia Ficción' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'Películas basadas en avances científicos o futuros imaginarios' })
  @IsString()
  descripcion: string;
}
