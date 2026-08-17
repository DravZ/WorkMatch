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
    private mensajeRepo: Repository<Mensaje>,
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreateMensajeDto) {
    const emisor = await this.usuarioRepo.findOneBy({ id_usuario: dto.emisorIdUsuario });
    const receptor = await this.usuarioRepo.findOneBy({ id_usuario: dto.receptorIdUsuario });

    if (!emisor) throw new NotFoundException(`Usuario emisor con id ${dto.emisorIdUsuario} no encontrado`);
    if (!receptor) throw new NotFoundException(`Usuario receptor con id ${dto.receptorIdUsuario} no encontrado`);

    const mensaje = this.mensajeRepo.create({
      emisor,
      receptor,
      contenido: dto.contenido,
      leido: dto.leido ?? false,
    });

    return this.mensajeRepo.save(mensaje);
  }

  findAll() {
    return this.mensajeRepo.find({ relations: { emisor: true, receptor: true } });
  }

  findOne(id: number) {
    return this.mensajeRepo.findOne({
      where: { id_mensaje: id },
      relations: { emisor: true, receptor: true },
    });
  }

  update(id: number, dto: UpdateMensajeDto) {
    return this.mensajeRepo.update(id, dto);
  }

  remove(id: number) {
    return this.mensajeRepo.delete(id);
  }
}
