import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vacante } from '../../vacante/entities/vacante.entity';

@Entity('categoria_vacante')
export class CategoriaVacante {
  @PrimaryGeneratedColumn()
  id_categoria!: number;

  @Column()
  nombre!: string;

  @OneToMany(() => Vacante, vacante => vacante.categoria)
  vacantes!: Vacante[];
}
