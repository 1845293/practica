import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePeliculaDto {
  @ApiProperty({ example: 'Interestelar' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'Un grupo de astronautas viaja a través de un agujero de gusano.' })
  @IsString()
  sinopsis: string;

  @ApiProperty({ example: 169 })
  @IsInt()
  @Min(1)
  duracionMin: number;

  @ApiProperty({ example: '+13', enum: ['ATP', '+13', '+18'] })
  @IsIn(['ATP', '+13', '+18'])
  clasificacion: string;

  @ApiPropertyOptional({ example: [1, 2], description: 'Ids de géneros (todos deben existir)' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  idGeneros?: number[];
}
