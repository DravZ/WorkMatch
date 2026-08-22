import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { HabilidadService } from './habilidad.service';
import { CreateHabilidadDto } from './dto/create-habilidad.dto';
import { UpdateHabilidadDto } from './dto/update-habilidad.dto';

@Controller('habilidades')
export class HabilidadController {
  constructor(private readonly habilidadService: HabilidadService) {}

  @Post()
  create(@Body() dto: CreateHabilidadDto) {
    return this.habilidadService.create(dto);
  }

  @Get()
  findAll() {
    return this.habilidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habilidadService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHabilidadDto) {
    return this.habilidadService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habilidadService.remove(+id);
  }
}
