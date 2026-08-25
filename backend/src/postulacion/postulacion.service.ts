import { Injectable, NotFoundException } from '@nestjs/common';
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
    private postulacionRepository: Repository<Postulacion>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Vacante)
    private vacanteRepository: Repository<Vacante>,
  ) {}

 
  async create(createPostulacionDto: CreatePostulacionDto) {

    const usuario = await this.usuarioRepository.findOneBy({
      id_usuario: createPostulacionDto.id_usuario,
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuario not found with Id:${createPostulacionDto.id_usuario}`,
      );
    }

    const vacante = await this.vacanteRepository.findOneBy({
      id_vacante: createPostulacionDto.id_vacante,
    });

    if (!vacante) {
      throw new NotFoundException(
        `Vacante not found with Id:${createPostulacionDto.id_vacante}`,
      );
    }

    const postulacion = this.postulacionRepository.create({
      usuario,
      vacante,
      estado: createPostulacionDto.estado ?? 'pendiente',
    });

    return this.postulacionRepository.save(postulacion);
  }

  
  async findAll() {

    const postulaciones = await this.postulacionRepository.find({
      relations: {
        usuario: true,
        vacante: true,
      },
    });

    return postulaciones;
  }


  async findOne(id: number) {

    const postulacion = await this.postulacionRepository.findOne({
      where: {
        id_postulacion: id,
      },
      relations: {
        usuario: true,
        vacante: true,
      },
    });

    if (!postulacion) {
      throw new NotFoundException(
        `Postulacion not found with Id:${id}`,
      );
    }

    return postulacion;
  }

  async update(
    id: number,
    updatePostulacionDto: UpdatePostulacionDto,
  ) {

    const postulacion = await this.findOne(id);

    Object.assign(postulacion, updatePostulacionDto);

    return this.postulacionRepository.save(postulacion);
  }


  async remove(id: number) {

    await this.findOne(id);

    await this.postulacionRepository.delete(id);

    return {
      message: `Postulacion with Id:${id} has been deleted successfully`,
    };
  }


      async aceptarTrabajador(id_vacante: number, id_usuario: number) {
      const vacante = await this.vacanteRepository.findOne({
        where: { id_vacante },
        relations: { postulaciones: true },
      });

      if (!vacante) throw new NotFoundException('Vacante no encontrada');
      if (vacante.fecha_inicio && new Date() >= vacante.fecha_inicio) {
        throw new Error('Ya no se puede aceptar trabajadores después de la fecha de inicio');
      }
      const aceptados = vacante.postulaciones.filter(p => p.estado === 'aceptado').length;
      if (aceptados >= vacante.empleados_necesarios) {
        throw new Error('Ya se alcanzó el límite de trabajadores aceptados');
      }
      const postulacion = await this.postulacionRepository.findOne({
        where: { usuario: { id_usuario }, vacante: { id_vacante } },
        relations: { usuario: true, vacante: true },
      });
      if (!postulacion) throw new NotFoundException('Postulación no encontrada');
      postulacion.estado = 'aceptado';
      return this.postulacionRepository.save(postulacion);
    }

    async revocarAceptacion(id_vacante: number, id_usuario: number) {
      const vacante = await this.vacanteRepository.findOne({ where: { id_vacante } });
      if (!vacante) throw new NotFoundException('Vacante no encontrada');

      if (vacante.fecha_inicio && new Date() >= vacante.fecha_inicio) {
        throw new Error('Ya no se puede revocar después de la fecha de inicio');
      }

      const postulacion = await this.postulacionRepository.findOne({
        where: { usuario: { id_usuario }, vacante: { id_vacante } },
      });

      if (!postulacion) throw new NotFoundException('Postulación no encontrada');

      postulacion.estado = 'revocado';
      return this.postulacionRepository.save(postulacion);
    }


}