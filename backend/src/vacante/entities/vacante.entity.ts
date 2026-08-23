import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Empresa } from '../../empresa/entities/empresa.entity';
import { Postulacion } from '../../postulacion/entities/postulacion.entity';
import { CategoriaVacante } from '../../categoria_vacante/entities/categoria_vacante.entity';
import { EstadoVacante } from '../enums/estado-vacante.enum';

@Entity('vacantes')
export class Vacante {
  @PrimaryGeneratedColumn()
  id_vacante!: number;

  @ManyToOne(() => Empresa, (empresa) => empresa.vacantes)
  empresa!: Empresa;

  @ManyToOne(() => CategoriaVacante, (categoria) => categoria.vacantes)
  categoria!: CategoriaVacante;

  @Column()
  titulo!: string;

  @Column('text')
  descripcion!: string;

  @Column()
  ubicacion!: string;

  @Column({ nullable: true })
  salario!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_publicacion!: Date;

  @Column({ type: 'date', nullable: true })
  fecha_inicio!: Date;

  @Column({ default: 1 })
  empleados_necesarios!: number;

  @Column({ nullable: true })
  horario!: string;

  @Column({ nullable: true })
  duracion_estimada!: string;

  @Column('text', { nullable: true })
  requerimientos!: string;

  @Column('text', { nullable: true })
  habilidades_optimas!: string;

  @Column({
    type: 'enum',
    enum: EstadoVacante,
    default: EstadoVacante.ACTIVA,
  })
  estado!: EstadoVacante;

  @OneToMany(() => Postulacion, (postulacion) => postulacion.vacante)
  postulaciones!: Postulacion[];

  @Column({ default: false })
  urgente!: boolean;

  @Column({ default: 'hora' })
  tipo_pago!: 'hora' | 'fijo';
}
