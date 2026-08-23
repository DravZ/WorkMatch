import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empresa } from './entities/empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { EstadoVacante } from 'src/vacante/enums/estado-vacante.enum';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async create(createEmpresaDto: CreateEmpresaDto) {
    const { id_usuario, ...datosEmpresa } = createEmpresaDto;

    // Verificar que el usuario exista
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario },
    });

    if (!usuario) {
      throw new NotFoundException(
        `No se encontró el usuario con ID ${id_usuario}`,
      );
    }

    // Verificar que el usuario no tenga ya una empresa
    const empresaExistente = await this.empresaRepository.findOne({
      where: {
        usuario: {
          id_usuario,
        },
      },
    });

    if (empresaExistente) {
      throw new ConflictException(
        `El usuario con ID ${id_usuario} ya tiene una empresa asociada`,
      );
    }

    // Crear la empresa asociándola al usuario
    const empresa = this.empresaRepository.create({
      ...datosEmpresa,
      usuario,
    });

    return await this.empresaRepository.save(empresa);
  }

  async findAll() {
    return await this.empresaRepository.find({
      relations: {
        usuario: true,
      },
    });
  }

  async findOne(id: number) {
    const empresa = await this.empresaRepository.findOne({
      where: { id_empresa: id },
      relations: {
        usuario: true,
      },
    });

    if (!empresa) {
      throw new NotFoundException(
        `No se encontró la empresa con ID ${id}`,
      );
    }

    return empresa;
  }

  async update(
    id: number,
    updateEmpresaDto: UpdateEmpresaDto,
  ) {
    const empresa = await this.findOne(id);

    Object.assign(empresa, updateEmpresaDto);

    return await this.empresaRepository.save(empresa);
  }

  async findByUsuarioId(id_usuario: number) {
    const empresa = await this.empresaRepository.findOne({
      where: {
        usuario: {
          id_usuario,
        },
      },
      relations: {
        usuario: true,
      },
    });

    if (!empresa) {
      throw new NotFoundException(
        `No se encontró una empresa asociada al usuario con ID ${id_usuario}`,
      );
    }

    return empresa;
  }

  async getEstadisticas(id_empresa: number) {
    const empresa = await this.empresaRepository.findOne({
      where: {
        id_empresa,
      },
    });

    if (!empresa) {
      throw new NotFoundException(
        `No se encontró la empresa con ID ${id_empresa}`,
      );
    }

    const resultado = await this.empresaRepository
      .createQueryBuilder('empresa')
      .leftJoin('empresa.vacantes', 'vacante')
      .select('COUNT(vacante.id_vacante)', 'trabajos_creados')
      .addSelect(
        `COUNT(CASE WHEN vacante.estado = :estado THEN 1 END)`,
        'trabajos_completados',
      )
      .where('empresa.id_empresa = :id_empresa', { id_empresa })
      .setParameter('estado', EstadoVacante.COMPLETADA)
      .getRawOne();

    return {
      trabajos_creados: Number(resultado.trabajos_creados) || 0,
      trabajos_completados: Number(resultado.trabajos_completados) || 0,
    };
  }

  async remove(id: number) {
    const empresa = await this.findOne(id);

    await this.empresaRepository.remove(empresa);

    return {
      mensaje: `Empresa con ID ${id} eliminada correctamente`,
    };
  }
}