import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vacante } from './entities/vacante.entity';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { Empresa } from '../empresa/entities/empresa.entity';

@Injectable()
export class VacanteService {
  constructor(
    @InjectRepository(Vacante)
    private vacanteRepository: Repository<Vacante>,

    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}

  async create(createVacanteDto: CreateVacanteDto) {
    const empresa = await this.empresaRepository.findOneBy({
      id_empresa: createVacanteDto.id_empresa,
    });

    if (!empresa) {
      throw new NotFoundException(
        `Empresa not found with Id:${createVacanteDto.id_empresa}`,
      );
    }

    const vacante = this.vacanteRepository.create({
      titulo: createVacanteDto.titulo,
      descripcion: createVacanteDto.descripcion,
      ubicacion: createVacanteDto.ubicacion,
      tipo_contrato: createVacanteDto.tipo_contrato,
      salario: createVacanteDto.salario,
      estado: createVacanteDto.estado ?? 'activa',
      empresa,
    });

    return this.vacanteRepository.save(vacante);
  }

  async findAll() {
    return this.vacanteRepository.find({
      relations: {
        empresa: true,
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
      },
    });

    if (!vacante) {
      throw new NotFoundException(
        `Vacante not found with Id:${id}`,
      );
    }

    return vacante;
  }

  async update(
    id: number,
    updateVacanteDto: UpdateVacanteDto,
  ) {
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