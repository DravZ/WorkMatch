// postulacion.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Vacante } from '../../vacante/entities/vacante.entity';

export enum EstadoPostulacion {
  PENDIENTE = 'pendiente',
  ACEPTADA = 'aceptada',
  RECHAZADA = 'rechazada',
  REVOCADA = 'revocada',
  EN_PROCESO = 'en_proceso',
  FINALIZADA = 'finalizada',
}

@Entity('postulaciones')
export class Postulacion {
  @PrimaryGeneratedColumn()
  id_postulacion!: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.postulaciones)
  usuario!: Usuario;

  @ManyToOne(() => Vacante, (vacante) => vacante.postulaciones)
  vacante!: Vacante;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_postulacion!: Date;

  @Column({
    type: 'enum',
    enum: EstadoPostulacion,
    default: EstadoPostulacion.PENDIENTE,
  })
  estado!: EstadoPostulacion;
}
