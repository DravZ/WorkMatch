// usuario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Mensaje } from '../../mensajes/entities/mensaje.entity';
import { Postulacion } from '../../postulacion/entities/postulacion.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario!: number;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  contrasena_hash!: string;

  @Column()
  role!: 'work' | 'hire';

  @OneToMany(() => Mensaje, mensaje => mensaje.emisor)
  mensajes_enviados!: Mensaje[];

  @OneToMany(() => Mensaje, mensaje => mensaje.receptor)
  mensajes_recibidos!: Mensaje[];

  @OneToMany(() => Postulacion, postulacion => postulacion.usuario)
  postulaciones!: Postulacion[];
}
