import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
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
    // Verificar si el correo ya está registrado
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { email: dto.email },
    });

    if (usuarioExistente) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Convertir la contraseña a un hash
    const contrasenaHash = await bcrypt.hash(dto.password, 10);

    // Crear el usuario con el hash
    const usuario = this.usuarioRepository.create({
      fullName: dto.fullName,
      email: dto.email,
      role: dto.role,
      contrasena_hash: contrasenaHash,
    });

    // Guardar usuario en la base de datos
    const usuarioGuardado = await this.usuarioRepository.save(usuario);

    // No devolver la contraseña
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
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: id },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Verificar si se está cambiando el correo
    if (dto.email) {
      const usuarioConCorreo = await this.usuarioRepository.findOne({
        where: { email: dto.email },
      });

      if (
        usuarioConCorreo &&
        usuarioConCorreo.id_usuario !== usuario.id_usuario
      ) {
        throw new ConflictException(
          'El correo ya está registrado por otro usuario',
        );
      }

      usuario.email = dto.email;
    }

    // Actualizar contraseña y volver a generar el hash
    if (dto.password) {
      usuario.contrasena_hash = await bcrypt.hash(dto.password, 10);
    }

    // Actualizar nombre
    if (dto.fullName) {
      usuario.fullName = dto.fullName;
    }

    // Actualizar rol
    if (dto.role) {
      usuario.role = dto.role;
    }

    const usuarioActualizado = await this.usuarioRepository.save(usuario);

    return this.usuarioSinContrasena(usuarioActualizado);
  }

  async login(email: string, password: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    // Comparar la contraseña enviada con el hash guardado
    const contraseñaCorrecta = await bcrypt.compare(
      password,
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
