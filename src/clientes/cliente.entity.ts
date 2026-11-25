import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Boleto } from '../boletos/boleto.entity.js';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column()
  nombres: string;

  @Column()
  paterno: string;

  @Column()
  materno: string;

  @Column()
  email: string;

  @OneToMany(() => Boleto, (boleto) => boleto.cliente)
  boletos: Relation<Boleto[]>;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;
}
