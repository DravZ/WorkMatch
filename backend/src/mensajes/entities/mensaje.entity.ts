import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('mensajes')
export class Mensaje {
  @PrimaryGeneratedColumn()
  id_mensaje!: number;

  @ManyToOne(() => Usuario, usuario => usuario.mensajes_enviados)
  emisor!: Usuario;

  @ManyToOne(() => Usuario)
  receptor!: Usuario;

  @Column('text')
  contenido!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_envio!: Date;

  @Column({ default: false })
  leido!: boolean;
}
