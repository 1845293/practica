import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { SalasService } from './salas.service.js';
import { CreateSalaDto } from './dto/create-sala.dto.js';
import { UpdateSalaDto } from './dto/update-sala.dto.js';

@ApiTags('Salas')
@Controller('salas')
export class SalasController {
  constructor(private salasService: SalasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las salas' })
  @ApiResponse({ status: 200, description: 'Lista de salas' })
  findAll() {
    return this.salasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una sala por id (incluye sus funciones)' })
  @ApiResponse({ status: 200, description: 'Sala encontrada' })
  @ApiResponse({ status: 404, description: 'La sala no existe' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.salasService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una sala', description: 'Body: nombre, capacidad y tipo (2D, 3D, IMAX)' })
  @ApiResponse({ status: 201, description: 'Sala creada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() dto: CreateSalaDto) {
    return this.salasService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una sala', description: 'Body: cualquier campo de la sala' })
  @ApiResponse({ status: 200, description: 'Sala actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La sala no existe' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSalaDto) {
    return this.salasService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una sala (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Sala eliminada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La sala no existe' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.salasService.remove(id);
  }
}
