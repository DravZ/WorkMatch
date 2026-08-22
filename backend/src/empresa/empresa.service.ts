import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empresa } from './entities/empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    const empresa = this.empresaRepository.create(createEmpresaDto);

    return await this.empresaRepository.save(empresa);
  }

  async findAll() {
    return await this.empresaRepository.find();
  }

  async findOne(id: number) {
    const empresa = await this.empresaRepository.findOne({
      where: { id_empresa: id },
    });

    if (!empresa) {
      throw new NotFoundException(`No se encontró la empresa con ID ${id}`);
    }

    return empresa;
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    const empresa = await this.findOne(id);

    Object.assign(empresa, updateEmpresaDto);

    return await this.empresaRepository.save(empresa);
  }

  async remove(id: number) {
    const empresa = await this.findOne(id);

    await this.empresaRepository.remove(empresa);

    return {
      mensaje: `Empresa con ID ${id} eliminada correctamente`,
    };
  }
}