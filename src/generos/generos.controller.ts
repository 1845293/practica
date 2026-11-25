import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { GenerosService } from './generos.service.js';
import { CreateGeneroDto } from './dto/create-genero.dto.js';
import { UpdateGeneroDto } from './dto/update-genero.dto.js';

@ApiTags('Géneros')
@Controller('generos')
export class GenerosController {
  constructor(private generosService: GenerosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los géneros' })
  @ApiResponse({ status: 200, description: 'Lista de géneros' })
  findAll() {
    return this.generosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un género por id (incluye sus películas)' })
  @ApiResponse({ status: 200, description: 'Género encontrado' })
  @ApiResponse({ status: 404, description: 'El género no existe' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.generosService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear un género', description: 'Body: nombre y descripcion' })
  @ApiResponse({ status: 201, description: 'Género creado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() dto: CreateGeneroDto) {
    return this.generosService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un género', description: 'Body: cualquier campo del género' })
  @ApiResponse({ status: 200, description: 'Género actualizado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El género no existe' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGeneroDto) {
    return this.generosService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un género (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Género eliminado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'El género no existe' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.generosService.remove(id);
  }
}
