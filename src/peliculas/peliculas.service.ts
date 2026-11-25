import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Pelicula } from './pelicula.entity.js';
import { Genero } from '../generos/genero.entity.js';
import { CreatePeliculaDto } from './dto/create-pelicula.dto.js';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto.js';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula) private peliculaRepo: Repository<Pelicula>,
    @InjectRepository(Genero) private generoRepo: Repository<Genero>,
  ) {}

  findAll() {
    return this.peliculaRepo.find({ relations: { generos: true } });
  }

  async findOne(id: number) {
    const pelicula = await this.peliculaRepo.findOne({
      where: { idPelicula: id },
      relations: { generos: true, funciones: true },
    });
    if (!pelicula) throw new NotFoundException(`La película con id ${id} no existe`);
    return pelicula;
  }

  // Busca los géneros por id y lanza 404 si falta alguno
  private async buscarGeneros(idGeneros: number[]) {
    const ids = [...new Set(idGeneros)];
    const generos = await this.generoRepo.findBy({ idGenero: In(ids) });
    for (const id of ids) {
      if (!generos.find((g) => g.idGenero === id)) {
        throw new NotFoundException(`El género con id ${id} no existe`);
      }
    }
    return generos;
  }

  async create(dto: CreatePeliculaDto) {
    const { idGeneros, ...datos } = dto;
    const pelicula = this.peliculaRepo.create(datos);
    if (idGeneros && idGeneros.length > 0) {
      pelicula.generos = await this.buscarGeneros(idGeneros);
    }
    return this.peliculaRepo.save(pelicula);
  }

  async update(id: number, dto: UpdatePeliculaDto) {
    const pelicula = await this.findOne(id);
    Object.assign(pelicula, dto);
    return this.peliculaRepo.save(pelicula);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.peliculaRepo.softDelete(id);
    return { mensaje: `Película ${id} eliminada` };
  }

  async asignarGeneros(id: number, idGeneros: number[]) {
    const pelicula = await this.findOne(id);
    const nuevos = await this.buscarGeneros(idGeneros);
    for (const genero of nuevos) {
      const yaTiene = pelicula.generos.find((g) => g.idGenero === genero.idGenero);
      if (!yaTiene) pelicula.generos.push(genero);
    }
    return this.peliculaRepo.save(pelicula);
  }

  async quitarGenero(id: number, idGenero: number) {
    const pelicula = await this.findOne(id);
    const tiene = pelicula.generos.find((g) => g.idGenero === idGenero);
    if (!tiene) {
      throw new NotFoundException(`La película ${id} no tiene asignado el género con id ${idGenero}`);
    }
    pelicula.generos = pelicula.generos.filter((g) => g.idGenero !== idGenero);
    return this.peliculaRepo.save(pelicula);
  }
}
