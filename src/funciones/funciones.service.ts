import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from './funcion.entity.js';
import { Sala } from '../salas/sala.entity.js';
import { Pelicula } from '../peliculas/pelicula.entity.js';
import { CreateFuncionDto } from './dto/create-funcion.dto.js';
import { UpdateFuncionDto } from './dto/update-funcion.dto.js';

@Injectable()
export class FuncionesService {
  constructor(
    @InjectRepository(Funcion) private funcionRepo: Repository<Funcion>,
    @InjectRepository(Sala) private salaRepo: Repository<Sala>,
    @InjectRepository(Pelicula) private peliculaRepo: Repository<Pelicula>,
  ) {}

  findAll() {
    return this.funcionRepo.find({ relations: { sala: true, pelicula: true } });
  }

  async findOne(id: number) {
    const funcion = await this.funcionRepo.findOne({
      where: { idFuncion: id },
      relations: { sala: true, pelicula: true, boletos: true },
    });
    if (!funcion) throw new NotFoundException(`La función con id ${id} no existe`);
    return funcion;
  }

  async create(dto: CreateFuncionDto) {
    const sala = await this.salaRepo.findOneBy({ idSala: dto.idSala });
    if (!sala) throw new NotFoundException(`La sala con id ${dto.idSala} no existe`);
    const pelicula = await this.peliculaRepo.findOneBy({ idPelicula: dto.idPelicula });
    if (!pelicula) throw new NotFoundException(`La película con id ${dto.idPelicula} no existe`);

    const funcion = this.funcionRepo.create({
      fechaHora: new Date(dto.fechaHora),
      precio: dto.precio,
      sala,
      pelicula,
    });
    return this.funcionRepo.save(funcion);
  }

  async update(id: number, dto: UpdateFuncionDto) {
    const funcion = await this.findOne(id);

    if (dto.idSala !== undefined) {
      const sala = await this.salaRepo.findOneBy({ idSala: dto.idSala });
      if (!sala) throw new NotFoundException(`La sala con id ${dto.idSala} no existe`);
      funcion.sala = sala;
    }
    if (dto.idPelicula !== undefined) {
      const pelicula = await this.peliculaRepo.findOneBy({ idPelicula: dto.idPelicula });
      if (!pelicula) throw new NotFoundException(`La película con id ${dto.idPelicula} no existe`);
      funcion.pelicula = pelicula;
    }
    if (dto.fechaHora !== undefined) funcion.fechaHora = new Date(dto.fechaHora);
    if (dto.precio !== undefined) funcion.precio = dto.precio;

    return this.funcionRepo.save(funcion);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.funcionRepo.softDelete(id);
    return { mensaje: `Función ${id} eliminada` };
  }
}
