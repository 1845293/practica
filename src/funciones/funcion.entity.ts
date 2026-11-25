import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Sala } from '../salas/sala.entity.js';
import { Pelicula } from '../peliculas/pelicula.entity.js';
import { Boleto } from '../boletos/boleto.entity.js';

@Entity('funciones')
export class Funcion {
  @PrimaryGeneratedColumn()
  idFuncion: number;

  @Column({ type: 'timestamp' })
  fechaHora: Date;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
  })
  precio: number;

  @ManyToOne(() => Sala, (sala) => sala.funciones)
  @JoinColumn({ name: 'idSala' })
  sala: Relation<Sala>;

  @ManyToOne(() => Pelicula, (pelicula) => pelicula.funciones)
  @JoinColumn({ name: 'idPelicula' })
  pelicula: Relation<Pelicula>;

  @OneToMany(() => Boleto, (boleto) => boleto.funcion)
  boletos: Relation<Boleto[]>;

  @CreateDateColumn()
  creadoEn: Date;

  @UpdateDateColumn()
  actualizadoEn: Date;

  @DeleteDateColumn()
  eliminadoEn: Date;
}
