import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class AsignarGenerosDto {
  @ApiProperty({ example: [1, 2] })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  idGeneros: number[];
}
