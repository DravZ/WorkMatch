import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vacante } from './entities/vacante.entity';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { Empresa } from '../empresa/entities/empresa.entity';
import { CategoriaVacante } from '../categoria_vacante/entities/categoria_vacante.entity';
import { EstadoVacante } from './enums/estado-vacante.enum';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class VacanteService {
  constructor(
    @InjectRepository(Vacante)
    private vacanteRepository: Repository<Vacante>,

    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,

    @InjectRepository(CategoriaVacante)
    private categoriaRepository: Repository<CategoriaVacante>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

  ) {}

  async create(createVacanteDto: CreateVacanteDto) {
    const empresa = await this.empresaRepository.findOneBy({
      id_empresa: createVacanteDto.id_empresa,
    });
    if (!empresa) {
      throw new NotFoundException(
        `Empresa no encontrada con ID: ${createVacanteDto.id_empresa}`,
      );}
    const categoria = await this.categoriaRepository.findOneBy({
      id_categoria: createVacanteDto.id_categoria,
    });
    if (!categoria) {
      throw new NotFoundException(
        `Categoría no encontrada con ID: ${createVacanteDto.id_categoria}`,
      );
    }
    const {...vacanteData } = createVacanteDto;
    const vacante = this.vacanteRepository.create({
      titulo: vacanteData.titulo,
      descripcion: vacanteData.descripcion,
      ubicacion: vacanteData.ubicacion,
      salario: vacanteData.salario ?? 'No especificado',
      fecha_inicio: vacanteData.fecha_inicio? new Date(vacanteData.fecha_inicio): undefined,
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


 async finalizarVacante(id: number) {
  const vacante = await this.vacanteRepository.findOne({
    where: { id_vacante: id },
    relations: { postulaciones: { usuario: true } },
  });
  if (!vacante) throw new NotFoundException('Vacante no encontrada');
  vacante.estado = EstadoVacante.COMPLETADA;
  await this.vacanteRepository.save(vacante);
  for (const postulacion of vacante.postulaciones) {
    if (postulacion.estado === 'aceptado') {
      postulacion.usuario.trabajos_completados += 1;
      await this.usuarioRepository.save(postulacion.usuario);
    }
  }

  return { mensaje: 'Vacante finalizada y estadísticas actualizadas' };
}

async remove(id: number) {
  const vacante = await this.findOne(id);
  if (vacante.fecha_inicio && new Date() >= vacante.fecha_inicio) {
    throw new Error('No se puede eliminar después de la fecha de inicio');
  }
  vacante.estado = EstadoVacante.INACTIVA;
  await this.vacanteRepository.save(vacante);
  return { mensaje: `Vacante ${id} marcada como inactiva` };
}

async postulacionesPorEmpresa(id_empresa: number) {
  const vacantes = await this.vacanteRepository.find({
    where: { empresa: { id_empresa } },
    relations: { postulaciones: { usuario: true } },
  });

  return vacantes.map(v => ({
    vacante: v.titulo,
    postulaciones: v.postulaciones,
  }));
}

  
}
