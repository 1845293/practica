import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { ClientesService } from './clientes.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private clientesService: ClientesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de clientes' })
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por id (incluye sus boletos y funciones)' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado' })
  @ApiResponse({ status: 404, description: 'El cliente no existe' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un cliente', description: 'Body: nombres, paterno, materno y email' })
  @ApiResponse({ status: 201, description: 'Cliente creado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() dto: CreateClienteDto) {
    return this.clientesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un cliente', description: 'Body: cualquier campo del cliente' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El cliente no existe' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClienteDto) {
    return this.clientesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un cliente (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Cliente eliminado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El cliente no existe' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.remove(id);
  }
}
