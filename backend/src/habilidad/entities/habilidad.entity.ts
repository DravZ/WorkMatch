import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('habilidades')
export class Habilidad {
  @PrimaryGeneratedColumn()
  id_habilidad!: number;

  @Column()
  nombre!: string;

  @ManyToMany(() => Usuario, usuario => usuario.habilidades)
  usuarios!: Usuario[];
}
