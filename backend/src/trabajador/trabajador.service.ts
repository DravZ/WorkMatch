import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Trabajador } from './entities/trabajador.entity';

import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';

import { Usuario } from '../usuario/entities/usuario.entity';
import { Habilidad } from '../habilidad/entities/habilidad.entity';
import { CategoriaVacante } from '../categoria_vacante/entities/categoria_vacante.entity';

@Injectable()
export class TrabajadorService {
  constructor(
    @InjectRepository(Trabajador)
    private trabajadorRepo: Repository<Trabajador>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,

    @InjectRepository(Habilidad)
    private habilidadRepo: Repository<Habilidad>,

    @InjectRepository(CategoriaVacante)
    private categoriaRepo: Repository<CategoriaVacante>,
  ) {}

  async create(dto: CreateTrabajadorDto) {
    // Buscar usuario
    const usuario = await this.usuarioRepo.findOne({
      where: { id_usuario: dto.idUsuario },
    });

    if (!usuario) {
      throw new NotFoundException(
        `Usuario con ID ${dto.idUsuario} no encontrado`,
      );
    }

    // Buscar habilidades
    let habilidades: Habilidad[] = [];

    if (dto.habilidades?.length) {
      habilidades = await this.habilidadRepo.find({
        where: {
          id_habilidad: In(dto.habilidades),
        },
      });

      if (habilidades.length !== dto.habilidades.length) {
        throw new NotFoundException(
          'Una o más habilidades no fueron encontradas',
        );
      }
    }

    // Buscar categorías
    let categorias: CategoriaVacante[] = [];

    if (dto.categorias?.length) {
      categorias = await this.categoriaRepo.find({
        where: {
          id_categoria: In(dto.categorias),
        },
      });

      if (categorias.length !== dto.categorias.length) {
        throw new NotFoundException(
          'Una o más categorías no fueron encontradas',
        );
      }
    }

    // Crear trabajador sin los IDs que no pertenecen directamente a la Entity
    const trabajador = this.trabajadorRepo.create({
      ubicacion: dto.ubicacion,
      tarifa_hora: dto.tarifa_hora,
      trabajos_completados: dto.trabajos_completados,
      calificacion: dto.calificacion,
      total_calificaciones: dto.total_calificaciones,
      especialidad_carrera: dto.especialidad_carrera,
      area_trabajo: dto.area_trabajo,
      is_verified: dto.is_verified,
      disponibilidad: dto.disponibilidad,

      usuario,
      habilidades,
      categorias,
    });

    const trabajadorGuardado = await this.trabajadorRepo.save(trabajador);

    return this.findOne(trabajadorGuardado.id_trabajador);
  }

  async findAll() {
    return this.trabajadorRepo
      .createQueryBuilder('trabajador')
      .leftJoinAndSelect('trabajador.usuario', 'usuario')
      .leftJoinAndSelect('trabajador.habilidades', 'habilidades')
      .leftJoinAndSelect('trabajador.categorias', 'categorias')
      .where('usuario.role = :role', { role: 'work' })
      .getMany();
  }

  async findOne(id: number) {
    const trabajador = await this.trabajadorRepo.findOne({
      where: { id_trabajador: id },
      relations: {
        usuario: true,
        habilidades: true,
        categorias: true,
      },
    });

    if (!trabajador) {
      throw new NotFoundException(
        `Trabajador con ID ${id} no encontrado`,
      );
    }

    return trabajador;
  }

  async findByIdUsuario(idUsuario: number) {
    const trabajador = await this.trabajadorRepo.findOne({
      where: {
        usuario: {
          id_usuario: idUsuario,
        },
      },
      relations: {
        usuario: true,
        habilidades: true,
        categorias: true,
      },
    });

    if (!trabajador) {
      throw new NotFoundException(
        `Trabajador asociado al usuario con ID ${idUsuario} no encontrado`,
      );
    }

    return trabajador;
  }

  async update(id: number, dto: UpdateTrabajadorDto) {
    const trabajador = await this.findOne(id);

    // No permitimos cambiar el usuario asociado desde el update.
    const {
      idUsuario,
      habilidades: habilidadesIds,
      categorias: categoriasIds,
      ...datosTrabajador
    } = dto;

    // Actualizar campos simples
    Object.assign(trabajador, datosTrabajador);

    // Actualizar habilidades solamente si vienen en el DTO
    if (habilidadesIds !== undefined) {
      if (habilidadesIds.length === 0) {
        trabajador.habilidades = [];
      } else {
        const habilidades = await this.habilidadRepo.find({
          where: {
            id_habilidad: In(habilidadesIds),
          },
        });

        if (habilidades.length !== habilidadesIds.length) {
          throw new NotFoundException(
            'Una o más habilidades no fueron encontradas',
          );
        }

        trabajador.habilidades = habilidades;
      }
    }

    // Actualizar categorías solamente si vienen en el DTO
    if (categoriasIds !== undefined) {
      if (categoriasIds.length === 0) {
        trabajador.categorias = [];
      } else {
        const categorias = await this.categoriaRepo.find({
          where: {
            id_categoria: In(categoriasIds),
          },
        });

        if (categorias.length !== categoriasIds.length) {
          throw new NotFoundException(
            'Una o más categorías no fueron encontradas',
          );
        }

        trabajador.categorias = categorias;
      }
    }

    await this.trabajadorRepo.save(trabajador);

    return this.findOne(id);
  }

  async updateByIdUsuario(
    idUsuario: number,
    dto: UpdateTrabajadorDto,
  ) {
    const trabajador = await this.findByIdUsuario(idUsuario);

    // No permitimos cambiar el usuario asociado.
    const {
      idUsuario: _idUsuario,
      habilidades: habilidadesIds,
      categorias: categoriasIds,
      ...datosTrabajador
    } = dto;

    // Actualizar campos simples
    Object.assign(trabajador, datosTrabajador);

    // Actualizar habilidades
    if (habilidadesIds !== undefined) {
      if (habilidadesIds.length === 0) {
        trabajador.habilidades = [];
      } else {
        const habilidades = await this.habilidadRepo.find({
          where: {
            id_habilidad: In(habilidadesIds),
          },
        });

        if (habilidades.length !== habilidadesIds.length) {
          throw new NotFoundException(
            'Una o más habilidades no fueron encontradas',
          );
        }

        trabajador.habilidades = habilidades;
      }
    }

    // Actualizar categorías
    if (categoriasIds !== undefined) {
      if (categoriasIds.length === 0) {
        trabajador.categorias = [];
      } else {
        const categorias = await this.categoriaRepo.find({
          where: {
            id_categoria: In(categoriasIds),
          },
        });

        if (categorias.length !== categoriasIds.length) {
          throw new NotFoundException(
            'Una o más categorías no fueron encontradas',
          );
        }

        trabajador.categorias = categorias;
      }
    }

    await this.trabajadorRepo.save(trabajador);

    return this.findByIdUsuario(idUsuario);
  }

  async remove(id: number) {
    const trabajador = await this.findOne(id);

    return this.trabajadorRepo.remove(trabajador);
  }
}