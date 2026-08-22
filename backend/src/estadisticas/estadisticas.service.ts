import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trabajador } from '../trabajador/entities/trabajador.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Vacante } from '../vacante/entities/vacante.entity';
import { Review } from '../review/entities/review.entity';

@Injectable()
export class EstadisticasService {
  constructor(
    @InjectRepository(Trabajador) private trabajadorRepo: Repository<Trabajador>,
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Vacante) private vacanteRepo: Repository<Vacante>,
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
  ) {}

  async resumen() {
    const totalTrabajadores = await this.trabajadorRepo.count();
    const totalEmpleadores = await this.usuarioRepo.count({ where: { role: 'hire' } });
    const vacantesUrgentes = await this.vacanteRepo.count({ where: { urgente: true } });

    const promedioCalificacion = await this.reviewRepo
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .getRawOne();

    return {
      totalTrabajadores,
      totalEmpleadores,
      vacantesUrgentes,
      promedioCalificacion: parseFloat(promedioCalificacion.avg) || 0,
    };
  }
}
