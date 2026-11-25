import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './genero.entity.js';
import { CreateGeneroDto } from './dto/create-genero.dto.js';
import { UpdateGeneroDto } from './dto/update-genero.dto.js';

@Injectable()
export class GenerosService {
  constructor(@InjectRepository(Genero) private generoRepo: Repository<Genero>) {}

  findAll() {
    return this.generoRepo.find();
  }

  async findOne(id: number) {
    const genero = await this.generoRepo.findOne({
      where: { idGenero: id },
      relations: { peliculas: true },
    });
    if (!genero) throw new NotFoundException(`El género con id ${id} no existe`);
    return genero;
  }

  create(dto: CreateGeneroDto) {
    const genero = this.generoRepo.create(dto);
    return this.generoRepo.save(genero);
  }

  async update(id: number, dto: UpdateGeneroDto) {
    const genero = await this.findOne(id);
    Object.assign(genero, dto);
    return this.generoRepo.save(genero);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.generoRepo.softDelete(id);
    return { mensaje: `Género ${id} eliminado` };
  }
}
