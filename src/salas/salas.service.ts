import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from './sala.entity.js';
import { CreateSalaDto } from './dto/create-sala.dto.js';
import { UpdateSalaDto } from './dto/update-sala.dto.js';

@Injectable()
export class SalasService {
  constructor(@InjectRepository(Sala) private salaRepo: Repository<Sala>) {}

  findAll() {
    return this.salaRepo.find();
  }

  async findOne(id: number) {
    const sala = await this.salaRepo.findOne({
      where: { idSala: id },
      relations: { funciones: true },
    });
    if (!sala) throw new NotFoundException(`La sala con id ${id} no existe`);
    return sala;
  }

  create(dto: CreateSalaDto) {
    const sala = this.salaRepo.create(dto);
    return this.salaRepo.save(sala);
  }

  async update(id: number, dto: UpdateSalaDto) {
    const sala = await this.findOne(id);
    Object.assign(sala, dto);
    return this.salaRepo.save(sala);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.salaRepo.softDelete(id);
    return { mensaje: `Sala ${id} eliminada` };
  }
}
