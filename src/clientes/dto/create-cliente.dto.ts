import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({ example: 'Carlos' })
  @IsString()
  @IsNotEmpty()
  nombres: string;

  @ApiProperty({ example: 'López' })
  @IsString()
  @IsNotEmpty()
  paterno: string;

  @ApiProperty({ example: 'García' })
  @IsString()
  @IsNotEmpty()
  materno: string;

  @ApiProperty({ example: 'carlos@correo.com' })
  @IsEmail()
  email: string;
}
