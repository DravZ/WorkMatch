import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacante } from './entities/vacante.entity';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';

@Injectable()
export class VacanteService {
  constructor(
    @InjectRepository(Vacante)
    private vacanteRepo: Repository<Vacante>,
  ) {}

  create(dto: CreateVacanteDto) {
    const vacante = this.vacanteRepo.create(dto);
    return this.vacanteRepo.save(vacante);
  }

  findAll() {
    return this.vacanteRepo.find({ relations: { empresa: true } });

  }

  findOne(id: number) {
  return this.vacanteRepo.findOne({
  where: { id_vacante: id },
  relations: { empresa: true },
});

  }

  update(id: number, dto: UpdateVacanteDto) {
    return this.vacanteRepo.update(id, dto);
  }

  remove(id: number) {
    return this.vacanteRepo.delete(id);
  }
}
