import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pelicula } from './pelicula.entity.js';
import { Genero } from '../generos/genero.entity.js';
import { PeliculasController } from './peliculas.controller.js';
import { PeliculasService } from './peliculas.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Pelicula, Genero])],
  controllers: [PeliculasController],
  providers: [PeliculasService],
  exports: [PeliculasService],
})
export class PeliculasModule {}
