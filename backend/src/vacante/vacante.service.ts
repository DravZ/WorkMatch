import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Vacante } from './entities/vacante.entity';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';

@Injectable()
export class VacanteService {

  constructor(
    @InjectRepository(Vacante)
    private vacanteRepository: Repository<Vacante>,
  ) {}

  async create(createVacanteDto: CreateVacanteDto) {
    const vacante = this.vacanteRepository.create(
      createVacanteDto,
    );
    return this.vacanteRepository.save(vacante);
  }

 
  async findAll() {
   const vacantes = await this.vacanteRepository.find({
      relations: {
        empresa: true,
      },
    });

    return vacantes;
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