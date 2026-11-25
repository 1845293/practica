import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Boleto } from './boleto.entity.js';
import { Funcion } from '../funciones/funcion.entity.js';
import { Cliente } from '../clientes/cliente.entity.js';
import { CreateBoletoDto } from './dto/create-boleto.dto.js';
import { UpdateBoletoDto } from './dto/update-boleto.dto.js';

@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto) private boletoRepo: Repository<Boleto>,
    @InjectRepository(Funcion) private funcionRepo: Repository<Funcion>,
    @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>,
  ) {}

  findAll() {
    return this.boletoRepo.find({ relations: { funcion: true, cliente: true } });
  }

  async findOne(id: number) {
    const boleto = await this.boletoRepo.findOne({
      where: { idBoleto: id },
      relations: { funcion: { sala: true }, cliente: true },
    });
    if (!boleto) throw new NotFoundException(`El boleto con id ${id} no existe`);
    return boleto;
  }

  private async buscarFuncion(idFuncion: number) {
    const funcion = await this.funcionRepo.findOne({
      where: { idFuncion },
      relations: { sala: true },
    });
    if (!funcion) throw new NotFoundException(`La función con id ${idFuncion} no existe`);
    return funcion;
  }

  private async buscarCliente(idCliente: number) {
    const cliente = await this.clienteRepo.findOneBy({ idCliente });
    if (!cliente) throw new NotFoundException(`El cliente con id ${idCliente} no existe`);
    return cliente;
  }

  // Reglas de negocio del asiento. idBoletoActual se usa al actualizar para no compararlo consigo mismo
  private async validarAsiento(funcion: Funcion, numeroAsiento: number, idBoletoActual?: number) {
    if (numeroAsiento < 1 || numeroAsiento > funcion.sala.capacidad) {
      throw new BadRequestException(
        `El asiento ${numeroAsiento} no es válido: la sala "${funcion.sala.nombre}" tiene capacidad para ${funcion.sala.capacidad} asientos (del 1 al ${funcion.sala.capacidad})`,
      );
    }

    const where: any = { funcion: { idFuncion: funcion.idFuncion }, numeroAsiento };
    if (idBoletoActual) where.idBoleto = Not(idBoletoActual);

    const ocupado = await this.boletoRepo.findOne({ where });
    if (ocupado) {
      throw new BadRequestException(
        `El asiento ${numeroAsiento} ya está ocupado para la función ${funcion.idFuncion}`,
      );
    }
  }

  async create(dto: CreateBoletoDto) {
    const funcion = await this.buscarFuncion(dto.idFuncion);
    const cliente = await this.buscarCliente(dto.idCliente);

    await this.validarAsiento(funcion, dto.numeroAsiento);

    const boleto = this.boletoRepo.create({
      funcion,
      cliente,
      numeroAsiento: dto.numeroAsiento,
      precioPagado: dto.precioPagado ?? funcion.precio, // si no envía precio, usa el de la función
    });
    return this.boletoRepo.save(boleto);
  }

  async update(id: number, dto: UpdateBoletoDto) {
    const boleto = await this.findOne(id);

    let funcion = boleto.funcion;
    if (dto.idFuncion !== undefined) {
      funcion = await this.buscarFuncion(dto.idFuncion);
      boleto.funcion = funcion;
    }
    if (dto.idCliente !== undefined) {
      boleto.cliente = await this.buscarCliente(dto.idCliente);
    }

    const asiento = dto.numeroAsiento ?? boleto.numeroAsiento;
    await this.validarAsiento(funcion, asiento, id);
    boleto.numeroAsiento = asiento;

    if (dto.precioPagado !== undefined) boleto.precioPagado = dto.precioPagado;

    return this.boletoRepo.save(boleto);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.boletoRepo.softDelete(id);
    return { mensaje: `Boleto ${id} anulado` };
  }
}
