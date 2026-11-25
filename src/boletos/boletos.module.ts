import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boleto } from './boleto.entity.js';
import { Funcion } from '../funciones/funcion.entity.js';
import { Cliente } from '../clientes/cliente.entity.js';
import { BoletosController } from './boletos.controller.js';
import { BoletosService } from './boletos.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Boleto, Funcion, Cliente])],
  controllers: [BoletosController],
  providers: [BoletosService],
  exports: [BoletosService],
})
export class BoletosModule {}
