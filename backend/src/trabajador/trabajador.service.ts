import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trabajador } from './entities/trabajador.entity';
import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';

@Injectable()
export class TrabajadorService {
  constructor(
    @InjectRepository(Trabajador)
    private trabajadorRepo: Repository<Trabajador>,
  ) {}

  create(dto: CreateTrabajadorDto) {
    const trabajador = this.trabajadorRepo.create(dto);
    return this.trabajadorRepo.save(trabajador);
  }

  findAll() {
    return this.trabajadorRepo.find({ relations: { usuario: true, habilidades: true, categorias: true } });
  }

  findOne(id: number) {
    return this.trabajadorRepo.findOne({
      where: { id_trabajador: id },
      relations: { usuario: true, habilidades: true, categorias: true },
    });
  }

  async update(id: number, dto: UpdateTrabajadorDto) {
    await this.trabajadorRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const trabajador = await this.findOne(id);
    if (!trabajador) {
      throw new NotFoundException(`Trabajador con ID ${id} no encontrado`);
    }
    return this.trabajadorRepo.remove(trabajador);
  }
}
