import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateBoletoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  idFuncion: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  idCliente: number;

  @ApiProperty({ example: 12 })
  @IsInt()
  @Min(1)
  numeroAsiento: number;

  @ApiPropertyOptional({ example: 30, description: 'Si no se envía, se usa el precio de la función' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  precioPagado?: number;
}
