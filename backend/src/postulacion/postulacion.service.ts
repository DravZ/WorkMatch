import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Postulacion } from './entities/postulacion.entity';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';
import { UpdatePostulacionDto } from './dto/update-postulacion.dto';

import { Usuario } from '../usuario/entities/usuario.entity';
import { Vacante } from '../vacante/entities/vacante.entity';

import { EstadoPostulacion } from './entities/postulacion.entity';

@Injectable()
export class PostulacionService {
  constructor(
    @InjectRepository(Postulacion)
    private readonly postulacionRepository: Repository<Postulacion>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Vacante)
    private readonly vacanteRepository: Repository<Vacante>,
  ) { }

  // =========================================================
  // CREATE
  // =========================================================

  async create(createPostulacionDto: CreatePostulacionDto) {
    const usuario = await this.usuarioRepository.findOneBy({
      id_usuario: createPostulacionDto.id_usuario,
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuario no encontrado con Id: ${createPostulacionDto.id_usuario}`,
      );
    }

    const vacante = await this.vacanteRepository.findOneBy({
      id_vacante: createPostulacionDto.id_vacante,
    });

    if (!vacante) {
      throw new NotFoundException(
        `Vacante no encontrada con Id: ${createPostulacionDto.id_vacante}`,
      );
    }

    // Evitar postulaciones duplicadas
    const postulacionExistente =
      await this.postulacionRepository.findOne({
        where: {
          usuario: {
            id_usuario: createPostulacionDto.id_usuario,
          },
          vacante: {
            id_vacante: createPostulacionDto.id_vacante,
          },
        },
      });

    if (postulacionExistente) {
      throw new ConflictException(
        'El usuario ya tiene una postulación para esta vacante',
      );
    }

    // No permitir postularse después de la fecha de inicio
    if (
      vacante.fecha_inicio &&
      this.obtenerInicioDelDia(vacante.fecha_inicio) <=
      this.obtenerInicioDelDia(new Date())
    ) {
      throw new BadRequestException(
        'Ya no es posible postularse porque la vacante ya inició',
      );
    }

    const postulacion = this.postulacionRepository.create({
      usuario,
      vacante,
      estado: EstadoPostulacion.PENDIENTE,
    });

    return this.postulacionRepository.save(postulacion);
  }

  // =========================================================
  // FIND ALL
  // =========================================================

  async findAll() {
    const postulaciones = await this.postulacionRepository.find({
      relations: {
        usuario: true,
        vacante: {
          empresa: true,
        },
      },
    });

    return this.sincronizarEstadosPorFecha(postulaciones);
  }

  // =========================================================
  // FIND ONE
  // =========================================================

  async findOne(id: number) {
    const postulacion = await this.postulacionRepository.findOne({
      where: {
        id_postulacion: id,
      },
      relations: {
        usuario: true,
        vacante: {
          empresa: true,
        },
      },
    });

    if (!postulacion) {
      throw new NotFoundException(
        `Postulación no encontrada con Id: ${id}`,
      );
    }

    const [postulacionActualizada] =
      await this.sincronizarEstadosPorFecha([postulacion]);

    return postulacionActualizada;
  }

  // =========================================================
  // FIND BY USUARIO
  // =========================================================

  async findByUsuario(id_usuario: number) {
    const postulaciones = await this.postulacionRepository.find({
      where: {
        usuario: {
          id_usuario,
        },
      },
      relations: {
        usuario: true,
        vacante: {
          empresa: true,
        },
      },
    });

    return this.sincronizarEstadosPorFecha(postulaciones);
  }

  // =========================================================
  // FIND BY VACANTE
  // =========================================================

  async findByVacante(id_vacante: number) {
    const postulaciones = await this.postulacionRepository.find({
      where: {
        vacante: {
          id_vacante,
        },
      },
      relations: {
        usuario: true,
        vacante: {
          empresa: true,
        },
      },
    });

    return this.sincronizarEstadosPorFecha(postulaciones);
  }

  // =========================================================
  // SINCRONIZAR ESTADOS POR FECHA
  // =========================================================

  private async sincronizarEstadosPorFecha(
    postulaciones: Postulacion[],
  ): Promise<Postulacion[]> {
    const ahora = new Date();
    const modificadas: Postulacion[] = [];

    for (const postulacion of postulaciones) {
      if (
        postulacion.estado === EstadoPostulacion.ACEPTADA &&
        postulacion.vacante.fecha_inicio &&
        this.obtenerInicioDelDia(postulacion.vacante.fecha_inicio) <=
        this.obtenerInicioDelDia(ahora)
      ) {
        postulacion.estado = EstadoPostulacion.EN_PROCESO;
        modificadas.push(postulacion);
      }
    }

    if (modificadas.length > 0) {
      await this.postulacionRepository.save(modificadas);
    }

    return postulaciones;
  }

  // =========================================================
  // ACEPTAR
  // =========================================================

  async aceptarTrabajador(id_postulacion: number) {
    const postulacion = await this.postulacionRepository.findOne({
      where: {
        id_postulacion,
      },
      relations: {
        usuario: true,
        vacante: true,
      },
    });

    if (!postulacion) {
      throw new NotFoundException(
        'Postulación no encontrada',
      );
    }

    if (postulacion.estado !== EstadoPostulacion.PENDIENTE) {
      throw new BadRequestException(
        `No se puede aceptar una postulación con estado ${postulacion.estado}`,
      );
    }

    if (
      postulacion.vacante.fecha_inicio &&
      this.obtenerInicioDelDia(postulacion.vacante.fecha_inicio) <=
      this.obtenerInicioDelDia(new Date())
    ) {
      throw new BadRequestException(
        'Ya no se pueden aceptar trabajadores después de la fecha de inicio',
      );
    }

    const postulacionesVacante =
      await this.postulacionRepository.find({
        where: {
          vacante: {
            id_vacante: postulacion.vacante.id_vacante,
          },
        },
      });

    const aceptados = postulacionesVacante.filter(
      (p) => p.estado === EstadoPostulacion.ACEPTADA,
    ).length;

    if (
      aceptados >= postulacion.vacante.empleados_necesarios
    ) {
      throw new BadRequestException(
        'Ya se alcanzó el límite de trabajadores aceptados para esta vacante',
      );
    }

    postulacion.estado = EstadoPostulacion.ACEPTADA;

    return this.postulacionRepository.save(postulacion);
  }

  // =========================================================
  // RECHAZAR
  // =========================================================

  async rechazarPostulacion(id_postulacion: number) {
    const postulacion = await this.postulacionRepository.findOne({
      where: {
        id_postulacion,
      },
      relations: {
        usuario: true,
        vacante: true,
      },
    });

    if (!postulacion) {
      throw new NotFoundException(
        'Postulación no encontrada',
      );
    }

    if (postulacion.estado !== EstadoPostulacion.PENDIENTE) {
      throw new BadRequestException(
        `No se puede rechazar una postulación con estado ${postulacion.estado}`,
      );
    }

    postulacion.estado = EstadoPostulacion.RECHAZADA;

    return this.postulacionRepository.save(postulacion);
  }

  // =========================================================
  // REVOCAR
  // =========================================================

  async revocarAceptacion(id_postulacion: number) {
    const postulacion = await this.postulacionRepository.findOne({
      where: {
        id_postulacion,
      },
      relations: {
        usuario: true,
        vacante: true,
      },
    });

    if (!postulacion) {
      throw new NotFoundException(
        'Postulación no encontrada',
      );
    }

    if (postulacion.estado !== EstadoPostulacion.ACEPTADA) {
      throw new BadRequestException(
        'Solo se puede revocar una postulación aceptada',
      );
    }

    if (
      postulacion.vacante.fecha_inicio &&
      this.obtenerInicioDelDia(postulacion.vacante.fecha_inicio) <=
      this.obtenerInicioDelDia(new Date())
    ) {
      throw new BadRequestException(
        'No se puede revocar la aceptación después de la fecha de inicio',
      );
    }

    postulacion.estado = EstadoPostulacion.REVOCADA;

    return this.postulacionRepository.save(postulacion);
  }

  // =========================================================
  // FINALIZAR
  // =========================================================

  async finalizarTrabajo(id_postulacion: number) {
    const postulacion = await this.postulacionRepository.findOne({
      where: {
        id_postulacion,
      },
      relations: {
        usuario: true,
        vacante: true,
      },
    });

    if (!postulacion) {
      throw new NotFoundException(
        'Postulación no encontrada',
      );
    }

    if (postulacion.estado !== EstadoPostulacion.EN_PROCESO) {
      throw new BadRequestException(
        'Solo se puede finalizar un trabajo que está en proceso',
      );
    }

    postulacion.estado = EstadoPostulacion.FINALIZADA;

    return this.postulacionRepository.save(postulacion);
  }

  // =========================================================
  // UPDATE
  // =========================================================

  async update(
    id: number,
    updatePostulacionDto: UpdatePostulacionDto,
  ) {
    const postulacion = await this.findOne(id);

    Object.assign(postulacion, updatePostulacionDto);

    return this.postulacionRepository.save(postulacion);
  }

  // =========================================================
  // REMOVE
  // =========================================================

  async remove(id: number) {
    await this.findOne(id);

    await this.postulacionRepository.delete(id);

    return {
      message: `Postulación con Id: ${id} eliminada correctamente`,
    };
  }

  // =========================================================
  // UTILIDAD PARA COMPARAR SOLO LA FECHA
  // =========================================================

  private obtenerInicioDelDia(fecha: Date): Date {
    const resultado = new Date(fecha);

    resultado.setHours(0, 0, 0, 0);

    return resultado;
  }
}