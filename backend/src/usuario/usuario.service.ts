import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

 async create(dto: CreateUsuarioDto) {
  const contrasenaHash = await bcrypt.hash(dto.password, 10);

  const usuario = this.usuarioRepository.create({
    fullName: dto.fullName,
    email: dto.email,
    role: dto.role,
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

    async update(id: number, dto: UpdateUsuarioDto) {
  const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: id } });
  if (!usuario) throw new NotFoundException(`Usuario con ID ${id} no encontrado`);

  if (dto.password) {
    usuario.contrasena_hash = await bcrypt.hash(dto.password, 10);
  }
  if (dto.fullName) usuario.fullName = dto.fullName;
  if (dto.email) usuario.email = dto.email;
  if (dto.role) usuario.role = dto.role;

  const usuarioActualizado = await this.usuarioRepository.save(usuario);
  return this.usuarioSinContrasena(usuarioActualizado);
}

  async login(email: string, contrasena: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const contraseñaCorrecta = await bcrypt.compare(
      contrasena,
      usuario.contrasena_hash,
    );

    if (!contraseñaCorrecta) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    return {
      mensaje: 'Login exitoso',
      usuario: this.usuarioSinContrasena(usuario),
    };
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
