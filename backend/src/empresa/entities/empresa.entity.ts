import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Vacante } from '../../vacante/entities/vacante.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn()
  id_empresa!: number;

  @Column()
  nombre_empresa!: string;

  @Column()
  sector!: string;

  @Column()
  ubicacion!: string;

  @Column()
  sitio_web!: string;

  @Column({ nullable: true })
  logo_url!: string;

  @Column({nullable: true})
  descripcion!: string;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Vacante, vacante => vacante.empresa)
  vacantes!: Vacante[];

  @OneToOne(() => Usuario, usuario => usuario.empresa)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;
}