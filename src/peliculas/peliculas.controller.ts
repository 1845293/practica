import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard.js';
import { PeliculasService } from './peliculas.service.js';
import { CreatePeliculaDto } from './dto/create-pelicula.dto.js';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto.js';
import { AsignarGenerosDto } from './dto/asignar-generos.dto.js';

@ApiTags('Películas')
@Controller('peliculas')
export class PeliculasController {
  constructor(private peliculasService: PeliculasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las películas (incluye sus géneros)' })
  @ApiResponse({ status: 200, description: 'Lista de películas' })
  findAll() {
    return this.peliculasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una película (incluye géneros y funciones)' })
  @ApiResponse({ status: 200, description: 'Película encontrada' })
  @ApiResponse({ status: 404, description: 'La película no existe' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.peliculasService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear una película, con arreglo opcional idGeneros' })
  @ApiResponse({ status: 201, description: 'Película creada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Algún género no existe' })
  create(@Body() dto: CreatePeliculaDto) {
    return this.peliculasService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar datos de una película' })
  @ApiResponse({ status: 200, description: 'Película actualizada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La película no existe' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePeliculaDto) {
    return this.peliculasService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar una película (borrado lógico)' })
  @ApiResponse({ status: 200, description: 'Película eliminada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La película no existe' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peliculasService.remove(id);
  }

  @Post(':id/generos')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Asignar uno o más géneros a la película',
    description: 'Body: { "idGeneros": [1, 2] }',
  })
  @ApiResponse({ status: 201, description: 'Géneros asignados' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La película o algún género no existe' })
  asignarGeneros(@Param('id', ParseIntPipe) id: number, @Body() dto: AsignarGenerosDto) {
    return this.peliculasService.asignarGeneros(id, dto.idGeneros);
  }

  @Delete(':id/generos/:idGenero')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Quitar un género de la película' })
  @ApiResponse({ status: 200, description: 'Género quitado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'La película no existe o no tiene ese género' })
  quitarGenero(
    @Param('id', ParseIntPipe) id: number,
    @Param('idGenero', ParseIntPipe) idGenero: number,
  ) {
    return this.peliculasService.quitarGenero(id, idGenero);
  }
}
