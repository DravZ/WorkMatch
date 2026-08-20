import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const contrasenaHash = await bcrypt.hash(
      createUsuarioDto.contrasena_hash,
      10,
    );

    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      contrasena_hash: contrasenaHash,
    });

    const usuarioGuardado = await this.usuarioRepository.save(usuario);

    return this.usuarioSinContrasena(usuarioGuardado);
  }

  async findAll() {
    const usuarios = await this.usuarioRepository.find();

    return usuarios.map((usuario) => this.usuarioSinContrasena(usuario));
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return this.usuarioSinContrasena(usuario);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const datosActualizados: Partial<Usuario> = {
      ...updateUsuarioDto,
    };

    if (updateUsuarioDto.contrasena_hash) {
      datosActualizados.contrasena_hash = await bcrypt.hash(
        updateUsuarioDto.contrasena_hash,
        10,
      );
    }

    Object.assign(usuario, datosActualizados);

    const usuarioActualizado = await this.usuarioRepository.save(usuario);

    return this.usuarioSinContrasena(usuarioActualizado);
  }

  async remove(id: number) {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    await this.usuarioRepository.delete(id);

    return {
      mensaje: `Usuario con ID ${id} eliminado correctamente`,
    };
  }

  private usuarioSinContrasena(usuario: Usuario) {
    const usuarioSinContrasena = Object.fromEntries(
      Object.entries(usuario).filter(([key]) => key !== 'contrasena_hash'),
    );

    return usuarioSinContrasena;
  }
}
