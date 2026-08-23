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

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

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

  async remove(id: number) {
    const empresa = await this.findOne(id);

    await this.empresaRepository.remove(empresa);

    return {
      mensaje: `Empresa con ID ${id} eliminada correctamente`,
    };
  }
}