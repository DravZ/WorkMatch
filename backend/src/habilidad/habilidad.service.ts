import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habilidad } from './entities/habilidad.entity';
import { CreateHabilidadDto } from './dto/create-habilidad.dto';
import { UpdateHabilidadDto } from './dto/update-habilidad.dto';

@Injectable()
export class HabilidadService {
  constructor(
    @InjectRepository(Habilidad)
    private habilidadRepo: Repository<Habilidad>,
  ) {}

  create(dto: CreateHabilidadDto) {
    const habilidad = this.habilidadRepo.create(dto);
    return this.habilidadRepo.save(habilidad);
  }

  findAll() {
    return this.habilidadRepo.find({ relations: { usuarios: true } });
  }

  findOne(id: number) {
    return this.habilidadRepo.findOne({
      where: { id_habilidad: id },
      relations: { usuarios: true },
    });
  }

  async update(id: number, dto: UpdateHabilidadDto) {
    await this.habilidadRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
  const habilidad = await this.findOne(id);
  if (!habilidad) {
    throw new NotFoundException(`Habilidad con ID ${id} no encontrada`);
  }
  return this.habilidadRepo.remove(habilidad);
}

}
