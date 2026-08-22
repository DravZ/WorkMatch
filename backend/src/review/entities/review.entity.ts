import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trabajador } from '../../trabajador/entities/trabajador.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id_review!: number;

  @Column({ type: 'int' })
  rating!: number; 

  @Column({ type: 'text', nullable: true })
  comentario!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha!: Date;

  @ManyToOne(() => Trabajador, trabajador => trabajador.id_trabajador)
  trabajador!: Trabajador;

  @ManyToOne(() => Usuario, usuario => usuario.id_usuario)
  empleador!: Usuario;
}
