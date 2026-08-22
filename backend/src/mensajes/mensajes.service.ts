import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensaje } from './entities/mensaje.entity';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class MensajeService {
  constructor(
    @InjectRepository(Mensaje)
    private mensajeRepository: Repository<Mensaje>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createMensajeDto: CreateMensajeDto) {
    const emisor = await this.usuarioRepository.findOneBy({
      id_usuario: createMensajeDto.emisorIdUsuario,
    });

    if (!emisor) {
      throw new NotFoundException(
        `Usuario emisor not found with Id:${createMensajeDto.emisorIdUsuario}`,
      );
    }

    const receptor = await this.usuarioRepository.findOneBy({
      id_usuario: createMensajeDto.receptorIdUsuario,
    });

    if (!receptor) {
      throw new NotFoundException(
        `Usuario receptor not found with Id:${createMensajeDto.receptorIdUsuario}`,
      );
    }

    const mensaje = this.mensajeRepository.create({
      emisor,
      receptor,
      contenido: createMensajeDto.contenido,
      leido: createMensajeDto.leido ?? false,
    });

    return this.mensajeRepository.save(mensaje);
  }

  async findAll() {
    const mensajes = await this.mensajeRepository.find({
      relations: {
        emisor: true,
        receptor: true,
      },
    });

    return mensajes;
  }

  async findOne(id: number) {
    const mensaje = await this.mensajeRepository.findOne({
      where: {
        id_mensaje: id,
      },
      relations: {
        emisor: true,
        receptor: true,
      },
    });

    if (!mensaje) {
      throw new NotFoundException(`Mensaje not found with Id:${id}`);
    }

    return mensaje;
  }

  async update(id: number, updateMensajeDto: UpdateMensajeDto) {
    const mensaje = await this.findOne(id);
    Object.assign(mensaje, updateMensajeDto);
    return this.mensajeRepository.save(mensaje);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.mensajeRepository.delete(id);

    return {
      message: `Mensaje with Id:${id} has been deleted successfully`,
    };
  }
}