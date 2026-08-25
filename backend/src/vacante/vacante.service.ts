import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vacante } from './entities/vacante.entity';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { Empresa } from '../empresa/entities/empresa.entity';
import { CategoriaVacante } from '../categoria_vacante/entities/categoria_vacante.entity';
import { EstadoVacante } from './enums/estado-vacante.enum';

@Injectable()
export class VacanteService {
  constructor(
    @InjectRepository(Vacante)
    private vacanteRepository: Repository<Vacante>,

    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,

    @InjectRepository(CategoriaVacante)
    private categoriaRepository: Repository<CategoriaVacante>,
  ) { }

  async create(createVacanteDto: CreateVacanteDto) {
    const empresa = await this.empresaRepository.findOneBy({
      id_empresa: createVacanteDto.id_empresa,
    });

    if (!empresa) {
      throw new NotFoundException(
        `Empresa no encontrada con ID: ${createVacanteDto.id_empresa}`,
      );
    }

    const categoria = await this.categoriaRepository.findOneBy({
      id_categoria: createVacanteDto.id_categoria,
    });

    if (!categoria) {
      throw new NotFoundException(
        `Categoría no encontrada con ID: ${createVacanteDto.id_categoria}`,
      );
    }

    const { id_empresa, id_categoria, ...vacanteData } = createVacanteDto;

    const vacante = this.vacanteRepository.create({
      titulo: vacanteData.titulo,
      descripcion: vacanteData.descripcion,
      ubicacion: vacanteData.ubicacion,

      salario: vacanteData.salario ?? 'No especificado',

      fecha_inicio: vacanteData.fecha_inicio
        ? new Date(vacanteData.fecha_inicio)
        : undefined,

      empleados_necesarios: vacanteData.empleados_necesarios ?? 1,

      horario: vacanteData.horario ?? 'No especificado',

      duracion_estimada: vacanteData.duracion_estimada ?? 'No especificada',

      requerimientos: vacanteData.requerimientos ?? 'No especificados',

      habilidades_optimas:
        vacanteData.habilidades_optimas ?? 'No especificadas',

      estado: vacanteData.estado ?? EstadoVacante.ACTIVA,

      urgente: vacanteData.urgente ?? false,

      tipo_pago: vacanteData.tipo_pago,

      empresa,
      categoria,
    });

    return await this.vacanteRepository.save(vacante);
  }

  async findAll() {
    return this.vacanteRepository.find({
      relations: {
        empresa: true,
        categoria: true,
      },
    });
  }

  async findByEmpresaId(id_empresa: number) {
    return this.vacanteRepository
      .createQueryBuilder('vacante')
      .leftJoinAndSelect('vacante.empresa', 'empresa')
      .leftJoinAndSelect('vacante.categoria', 'categoria')
      .where('empresa.id_empresa = :id_empresa', { id_empresa })
      .andWhere('vacante.estado != :estado', {
        estado: EstadoVacante.CANCELADA,
      })
      .getMany();
  }

  async findOne(id: number) {
    const vacante = await this.vacanteRepository.findOne({
      where: {
        id_vacante: id,
      },
      relations: {
        empresa: true,
        categoria: true,
      },
    });

    if (!vacante) {
      throw new NotFoundException(`Vacante not found with Id:${id}`);
    }

    return vacante;
  }

  async update(id: number, updateVacanteDto: UpdateVacanteDto) {
    const vacante = await this.findOne(id);

    Object.assign(vacante, updateVacanteDto);

    return this.vacanteRepository.save(vacante);
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.vacanteRepository.delete(id);

    return {
      message: `Vacante with Id:${id} has been deleted successfully`,
    };
  }
}
