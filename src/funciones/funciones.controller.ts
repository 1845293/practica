import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { FuncionesService } from './funciones.service.js';
import { CreateFuncionDto } from './dto/create-funcion.dto.js';
import { UpdateFuncionDto } from './dto/update-funcion.dto.js';

@ApiTags('Funciones')
@Controller('funciones')
export class FuncionesController {
  constructor(private funcionesService: FuncionesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las funciones (incluye su sala y su película)' })
  @ApiResponse({ status: 200, description: 'Lista de funciones' })
  findAll() {
    return this.funcionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una función (incluye sala, película y boletos vendidos)' })
  @ApiResponse({ status: 200, description: 'Función encontrada' })
  @ApiResponse({ status: 404, description: 'La función no existe' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.funcionesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una función (requiere idSala e idPelicula existentes)' })
  @ApiResponse({ status: 201, description: 'Función creada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La sala o película no existe' })
  create(@Body() dto: CreateFuncionDto) {
    return this.funcionesService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar una función (fecha y hora, precio, sala o película)' })
  @ApiResponse({ status: 200, description: 'Función actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La función, sala o película no existe' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateFuncionDto) {
    return this.funcionesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una función (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Función eliminada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La función no existe' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.funcionesService.remove(id);
  }
}
