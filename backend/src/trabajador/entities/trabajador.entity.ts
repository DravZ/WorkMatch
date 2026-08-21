import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Habilidad } from '../../habilidad/entities/habilidad.entity';
import { CategoriaVacante } from '../../categoria_vacante/entities/categoria_vacante.entity';

@Entity('trabajadores')
export class Trabajador {
  @PrimaryGeneratedColumn()
  id_trabajador!: number;

  @OneToOne(() => Usuario)
  @JoinColumn()
  usuario!: Usuario;

  @Column({ nullable: true })
  ubicacion!: string;

  @Column({ nullable: true })
  tarifa_hora!: number;

  @Column({ nullable: true })
  experiencia!: string;

  @Column({ type: 'float', default: 0 })
  calificacion!: number;

  @Column({ default: false })
  is_verified!: boolean;

  @Column({ nullable: true })
  disponibilidad!: string; // ej. "available now", "weekends"

  @ManyToMany(() => Habilidad, habilidad => habilidad.trabajadores, { cascade: true })
  @JoinTable()
  habilidades!: Habilidad[];

  @ManyToMany(() => CategoriaVacante, categoria => categoria.trabajadores, { cascade: true })
  @JoinTable()
  categorias!: CategoriaVacante[];
}
