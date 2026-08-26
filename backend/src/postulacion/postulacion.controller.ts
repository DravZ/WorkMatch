import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';

import { PostulacionService } from './postulacion.service';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';

@Controller('postulacion')
export class PostulacionController {
  constructor(
    private readonly postulacionService: PostulacionService,
  ) { }

  // =========================================================
  // CREAR POSTULACIÓN
  // =========================================================

  @Post()
  create(
    @Body() createPostulacionDto: CreatePostulacionDto,
  ) {
    return this.postulacionService.create(
      createPostulacionDto,
    );
  }

  // =========================================================
  // OBTENER TODAS
  // =========================================================

  @Get()
  findAll() {
    return this.postulacionService.findAll();
  }

  // =========================================================
  // OBTENER POR USUARIO
  // =========================================================

  @Get('usuario/:id_usuario')
  findByUsuario(
    @Param('id_usuario', ParseIntPipe) id_usuario: number,
  ) {
    return this.postulacionService.findByUsuario(id_usuario);
  }

  // =========================================================
  // OBTENER POR VACANTE
  // =========================================================

  @Get('vacante/:id_vacante')
  findByVacante(
    @Param('id_vacante', ParseIntPipe) id_vacante: number,
  ) {
    return this.postulacionService.findByVacante(id_vacante);
  }

  // =========================================================
  // OBTENER POR EMPRESA
  // =========================================================

  @Get('empresa/:id_empresa')
  findByEmpresa(
    @Param('id_empresa', ParseIntPipe) id_empresa: number,
  ) {
    return this.postulacionService.findByEmpresa(id_empresa);
  }

  // =========================================================
  // OBTENER UNA POSTULACIÓN
  // =========================================================

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postulacionService.findOne(id);
  }



  // =========================================================
  // ACEPTAR
  // =========================================================

  @Patch(':id/aceptar')
  aceptar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postulacionService.aceptarTrabajador(id);
  }

  // =========================================================
  // RECHAZAR
  // =========================================================

  @Patch(':id/rechazar')
  rechazar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postulacionService.rechazarPostulacion(id);
  }

  // =========================================================
  // REVOCAR
  // =========================================================

  @Patch(':id/revocar')
  revocar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postulacionService.revocarAceptacion(id);
  }

  // =========================================================
  // FINALIZAR TRABAJO
  // =========================================================

  @Patch(':id/finalizar')
  finalizar(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postulacionService.finalizarTrabajo(id);
  }

  // =========================================================
  // ELIMINAR
  // =========================================================

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.postulacionService.remove(id);
  }
}