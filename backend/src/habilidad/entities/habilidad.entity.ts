import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Trabajador } from '../../trabajador/entities/trabajador.entity';

@Entity('habilidades')
export class Habilidad {
  @PrimaryGeneratedColumn()
  id_habilidad!: number;

  @Column()
  nombre!: string;

  @ManyToMany(() => Trabajador, trabajador => trabajador.habilidades)
  trabajadores!: Trabajador[];
}
