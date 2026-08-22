import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Trabajador } from '../trabajador/entities/trabajador.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
    @InjectRepository(Trabajador)
    private trabajadorRepo: Repository<Trabajador>,
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreateReviewDto) {
    const trabajador = await this.trabajadorRepo.findOne({ where: { id_trabajador: dto.trabajadorId } });
    const empleador = await this.usuarioRepo.findOne({ where: { id_usuario: dto.empleadorId } });

    if (!trabajador || !empleador) {
      throw new NotFoundException('Trabajador o empleador no encontrado');
    }

    const review = this.reviewRepo.create({
      rating: dto.rating,
      comentario: dto.comentario,
      trabajador,
      empleador,
    });

    return this.reviewRepo.save(review);
  }

  findAll() {
    return this.reviewRepo.find({ relations: { trabajador: true, empleador: true } });
  }

  findOne(id: number) {
    return this.reviewRepo.findOne({
      where: { id_review: id },
      relations: { trabajador: true, empleador: true },
    });
  }

  async update(id: number, dto: UpdateReviewDto) {
    await this.reviewRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    if (!review) {
      throw new NotFoundException(`Review con ID ${id} no encontrada`);
    }
    return this.reviewRepo.remove(review);
  }
}
