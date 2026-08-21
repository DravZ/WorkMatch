import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriaVacanteService } from './categoria_vacante.service';
import { CreateCategoriaVacanteDto } from './dto/create-categoria_vacante.dto';
import { UpdateCategoriaVacanteDto } from './dto/update-categoria_vacante.dto';

@Controller('categoria_vacante')
export class CategoriaVacanteController {
  constructor(private readonly categoriaService: CategoriaVacanteService) {}

  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaVacanteDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaVacanteDto) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}
