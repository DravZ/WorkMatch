
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Postulacion } from '../../postulacion/entities/postulacion.entity';
import { Mensaje } from '../../mensajes/entities/mensaje.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  contrasena_hash!: string;

  @OneToMany(() => Postulacion, postulacion => postulacion.usuario)
  postulaciones!: Postulacion[];

  @OneToMany(() => Mensaje, mensaje => mensaje.emisor)
  mensajes_enviados!: Mensaje[];
}
