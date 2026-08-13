import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { Postulacion } from '../../postulacion/entities/postulacion.entity';

@Entity('vacantes')
export class Vacante {
  @PrimaryGeneratedColumn()
  id_vacante!: number;

  @ManyToOne(() => Empresa, empresa => empresa.vacantes)
  empresa!: Empresa;

  @Column()
  titulo!: string;

  @Column('text')
  descripcion!: string;

  @Column()
  ubicacion!: string;

  @Column()
  tipo_contrato!: string;

  @Column({ nullable: true })
  salario!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_publicacion!: Date;

  @Column({ default: 'activa' })
  estado!: string;

  @OneToMany(() => Postulacion, postulacion => postulacion.vacante)
  postulaciones!: Postulacion[];
}
