import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Usuario } from '../../usuario/entities/usuario.entity';
import { Habilidad } from '../../habilidad/entities/habilidad.entity';
import { CategoriaVacante } from '../../categoria_vacante/entities/categoria_vacante.entity';

@Entity('trabajadores')
export class Trabajador {
  @PrimaryGeneratedColumn()
  id_trabajador!: number;

  @OneToOne(() => Usuario, (usuario) => usuario.trabajador)
  @JoinColumn()
  usuario!: Usuario;

  @Column({ nullable: true })
  ubicacion!: string;

  @Column({ nullable: true })
  tarifa_hora!: number;

  @Column({ type: 'int', nullable: true })
  trabajos_completados!: number;

  @Column({ type: 'float', default: 0 })
  calificacion!: number;

  @Column({ type: 'int', default: 0 })
  total_calificaciones!: number;

  @Column({ nullable: true })
  especialidad_carrera!: string;

  @Column({ nullable: true })
  area_trabajo!: string;

  @Column({ default: false })
  is_verified!: boolean;

  @Column({ nullable: true })
  disponibilidad!: string;

  @ManyToMany(() => Habilidad, (habilidad) => habilidad.trabajadores)
  @JoinTable()
  habilidades!: Habilidad[];

  @ManyToMany(
    () => CategoriaVacante,
    (categoria) => categoria.trabajadores,
  )
  @JoinTable()
  categorias!: CategoriaVacante[];
}