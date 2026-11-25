import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from './genero.entity.js';
import { GenerosController } from './generos.controller.js';
import { GenerosService } from './generos.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Genero])],
  controllers: [GenerosController],
  providers: [GenerosService],
  exports: [GenerosService],
})
export class GenerosModule {}
