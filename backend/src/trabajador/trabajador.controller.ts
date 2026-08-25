import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';

import { TrabajadorService } from './trabajador.service';

import { CreateTrabajadorDto } from './dto/create-trabajador.dto';
import { UpdateTrabajadorDto } from './dto/update-trabajador.dto';

@Controller('trabajadores')
export class TrabajadorController {
  constructor(private readonly trabajadorService: TrabajadorService) {}

  @Post()
  create(@Body() dto: CreateTrabajadorDto) {
    return this.trabajadorService.create(dto);
  }

  @Get()
  findAll() {
    return this.trabajadorService.findAll();
  }

  // Buscar trabajador por su ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trabajadorService.findOne(+id);
  }

  // Buscar trabajador por ID del usuario relacionado
  @Get('usuario/:idUsuario')
  findByIdUsuario(@Param('idUsuario') idUsuario: string) {
    return this.trabajadorService.findByIdUsuario(+idUsuario);
  }

  // Actualizar trabajador por su ID
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTrabajadorDto,
  ) {
    return this.trabajadorService.update(+id, dto);
  }

  // Actualizar trabajador por ID del usuario relacionado
  @Put('usuario/:idUsuario')
  updateByIdUsuario(
    @Param('idUsuario') idUsuario: string,
    @Body() dto: UpdateTrabajadorDto,
  ) {
    return this.trabajadorService.updateByIdUsuario(+idUsuario, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trabajadorService.remove(+id);
  }
}