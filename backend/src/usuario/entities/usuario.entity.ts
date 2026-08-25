import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { Mensaje } from '../../mensajes/entities/mensaje.entity';
import { Postulacion } from '../../postulacion/entities/postulacion.entity';
import { Empresa } from '../../empresa/entities/empresa.entity';
import { Trabajador } from 'src/trabajador/entities/trabajador.entity';

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

  @Column({ default: false })
  is_verified!: boolean;

  @OneToOne(() => Empresa, empresa => empresa.usuario)
  empresa!: Empresa;

  @Column({ default: 0 })
  trabajos_completados!: number;

  @OneToOne(() => Trabajador, trabajador => trabajador.usuario)
  trabajador!: Trabajador;
}