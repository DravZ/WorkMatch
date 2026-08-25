import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VacanteService } from './vacante.service';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';

@Controller('vacante')
export class VacanteController {

  constructor(
    private readonly vacanteService: VacanteService,
  ) { }

  @Post()
  create(@Body() createVacanteDto: CreateVacanteDto) {
    return this.vacanteService.create(createVacanteDto);
  }

  @Get()
  findAll() {
    return this.vacanteService.findAll();
  }

  @Get('empresa/:id_empresa')
  findByEmpresaId(
    @Param('id_empresa') id_empresa: string,
  ) {
    return this.vacanteService.findByEmpresaId(+id_empresa);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacanteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVacanteDto: UpdateVacanteDto,
  ) {
    return this.vacanteService.update(
      +id,
      updateVacanteDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vacanteService.remove(+id);
  }

  @Patch(':id/finalizar')
finalizar(@Param('id') id: string) {
  return this.vacanteService.finalizarVacante(+id);
}

@Get('empresa/:id/postulaciones')
postulacionesPorEmpresa(@Param('id') id: string) {
  return this.vacanteService.postulacionesPorEmpresa(+id);
}

}