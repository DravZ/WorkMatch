import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Vacante } from '../../vacante/entities/vacante.entity';
import { Trabajador } from '../../trabajador/entities/trabajador.entity';

@Entity('categoria_vacante')
export class CategoriaVacante {
  @PrimaryGeneratedColumn()
  id_categoria!: number;

  @Column()
  nombre!: string;

  @OneToMany(() => Vacante, (vacante) => vacante.categoria)
  vacantes!: Vacante[];

  @ManyToMany(() => Trabajador, (trabajador) => trabajador.categorias)
  trabajadores!: Trabajador[];
}
