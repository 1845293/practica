import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@Injectable()
export class ClientesService {
  constructor(@InjectRepository(Cliente) private clienteRepo: Repository<Cliente>) {}

  findAll() {
    return this.clienteRepo.find();
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepo.findOne({
      where: { idCliente: id },
      relations: { boletos: { funcion: true } },
    });
    if (!cliente) throw new NotFoundException(`El cliente con id ${id} no existe`);
    return cliente;
  }

  create(dto: CreateClienteDto) {
    const cliente = this.clienteRepo.create(dto);
    return this.clienteRepo.save(cliente);
  }

  async update(id: number, dto: UpdateClienteDto) {
    const cliente = await this.findOne(id);
    Object.assign(cliente, dto);
    return this.clienteRepo.save(cliente);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.clienteRepo.softDelete(id);
    return { mensaje: `Cliente ${id} eliminado` };
  }
}
