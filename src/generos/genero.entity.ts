import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Pelicula } from '../peliculas/pelicula.entity.js';

@Entity('generos')
export class Genero {
  @PrimaryGeneratedColumn()
  idGenero: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToMany(() => Pelicula, (pelicula) => pelicula.generos)
  peliculas: Relation<Pelicula[]>;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;
}
