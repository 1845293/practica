import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Funcion } from '../funciones/funcion.entity.js';
import { Cliente } from '../clientes/cliente.entity.js';

@Entity('boletos')
export class Boleto {
  @PrimaryGeneratedColumn()
  idBoleto: number;

  @ManyToOne(() => Funcion, (funcion) => funcion.boletos)
  @JoinColumn({ name: 'idFuncion' })
  funcion: Relation<Funcion>;

  @ManyToOne(() => Cliente, (cliente) => cliente.boletos)
  @JoinColumn({ name: 'idCliente' })
  cliente: Relation<Cliente>;

  @Column()
  numeroAsiento: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
  })
  precioPagado: number;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;
}
