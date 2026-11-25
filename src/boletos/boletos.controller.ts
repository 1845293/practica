import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { BoletosService } from './boletos.service.js';
import { CreateBoletoDto } from './dto/create-boleto.dto.js';
import { UpdateBoletoDto } from './dto/update-boleto.dto.js';

@ApiTags('Boletos')
@Controller('boletos')
export class BoletosController {
  constructor(private boletosService: BoletosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los boletos' })
  @ApiResponse({ status: 200, description: 'Lista de boletos' })
  findAll() {
    return this.boletosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un boleto (incluye su función y su cliente)' })
  @ApiResponse({ status: 200, description: 'Boleto encontrado' })
  @ApiResponse({ status: 404, description: 'El boleto no existe' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boletosService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Vender un boleto (requiere idFuncion e idCliente existentes)',
    description: 'Si no se envía precioPagado se usa el precio de la función',
  })
  @ApiResponse({ status: 201, description: 'Boleto vendido' })
  @ApiResponse({ status: 400, description: 'Asiento fuera de rango o ya ocupado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La función o el cliente no existe' })
  create(@Body() dto: CreateBoletoDto) {
    return this.boletosService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un boleto (número de asiento o precio pagado)' })
  @ApiResponse({ status: 200, description: 'Boleto actualizado' })
  @ApiResponse({ status: 400, description: 'Asiento fuera de rango o ya ocupado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El boleto, función o cliente no existe' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBoletoDto) {
    return this.boletosService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar (anular) un boleto (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Boleto anulado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El boleto no existe' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boletosService.remove(id);
  }
}
