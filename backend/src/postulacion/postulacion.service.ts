import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postulacion } from './entities/postulacion.entity';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';
import { UpdatePostulacionDto } from './dto/update-postulacion.dto';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Vacante } from '../vacante/entities/vacante.entity';

@Injectable()
export class PostulacionService {
  constructor(
    @InjectRepository(Postulacion)
    private postulacionRepo: Repository<Postulacion>,
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Vacante)
    private vacanteRepo: Repository<Vacante>,
  ) {}

  async create(dto: CreatePostulacionDto) {
    const usuario = await this.usuarioRepo.findOneBy({ id_usuario: dto.id_usuario });
    const vacante = await this.vacanteRepo.findOneBy({ id_vacante: dto.id_vacante });

    if (!usuario || !vacante) {
      throw new Error('Usuario o Vacante no encontrados');
    }

    const postulacion = this.postulacionRepo.create({
      usuario: usuario,
      vacante: vacante,
      estado: dto.estado ?? 'pendiente',
    });

    return this.postulacionRepo.save(postulacion);
  }

  findAll() {
    return this.postulacionRepo.find({ relations: { usuario: true, vacante: true } });
  }

  findOne(id: number) {
    return this.postulacionRepo.findOne({
      where: { id_postulacion: id },
      relations: { usuario: true, vacante: true },
    });
  }

  update(id: number, dto: UpdatePostulacionDto) {
    return this.postulacionRepo.update(id, dto);
  }

  remove(id: number) {
    return this.postulacionRepo.delete(id);
  }
}
