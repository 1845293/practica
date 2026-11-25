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
import { Funcion } from '../funciones/funcion.entity.js';

@Entity('salas')
export class Sala {
  @PrimaryGeneratedColumn()
  idSala: number;

  @Column()
  nombre: string;

  @Column()
  capacidad: number;

  @Column()
  tipo: string; // 2D, 3D, IMAX

  @OneToMany(() => Funcion, (funcion) => funcion.sala)
  funciones: Relation<Funcion[]>;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;
}
