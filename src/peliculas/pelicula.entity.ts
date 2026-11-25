import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Genero } from '../generos/genero.entity.js';
import { Funcion } from '../funciones/funcion.entity.js';

@Entity('peliculas')
export class Pelicula {
  @PrimaryGeneratedColumn()
  idPelicula: number;

  @Column()
  titulo: string;

  @Column()
  sinopsis: string;

  @Column()
  duracionMin: number;

  @Column()
  clasificacion: string; // ATP, +13, +18

  @ManyToMany(() => Genero, (genero) => genero.peliculas)
  @JoinTable({
    name: 'pelicula_genero',
    joinColumn: { name: 'idPelicula', referencedColumnName: 'idPelicula' },
    inverseJoinColumn: { name: 'idGenero', referencedColumnName: 'idGenero' },
  })
  generos: Relation<Genero[]>;

  @OneToMany(() => Funcion, (funcion) => funcion.pelicula)
  funciones: Relation<Funcion[]>;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;
}
