import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcion } from './funcion.entity.js';
import { Sala } from '../salas/sala.entity.js';
import { Pelicula } from '../peliculas/pelicula.entity.js';
import { FuncionesController } from './funciones.controller.js';
import { FuncionesService } from './funciones.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Funcion, Sala, Pelicula])],
  controllers: [FuncionesController],
  providers: [FuncionesService],
  exports: [FuncionesService],
})
export class FuncionesModule {}
