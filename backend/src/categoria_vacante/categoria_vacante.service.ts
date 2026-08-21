import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaVacante } from './entities/categoria_vacante.entity';
import { CreateCategoriaVacanteDto } from './dto/create-categoria_vacante.dto';
import { UpdateCategoriaVacanteDto } from './dto/update-categoria_vacante.dto';

@Injectable()
export class CategoriaVacanteService {
  constructor(
    @InjectRepository(CategoriaVacante)
    private categoriaRepository: Repository<CategoriaVacante>,
  ) {}

  async create(createCategoriaDto: CreateCategoriaVacanteDto) {
    const categoria = this.categoriaRepository.create(createCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  async findAll() {
    return this.categoriaRepository.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findOne({ where: { id_categoria: id } });
    if (!categoria) throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    return categoria;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaVacanteDto) {
    const categoria = await this.findOne(id);
    Object.assign(categoria, updateCategoriaDto);
    return this.categoriaRepository.save(categoria);
  }

  async remove(id: number) {
    const categoria = await this.findOne(id);
    await this.categoriaRepository.delete(id);
    return { message: `Categoría con ID ${id} eliminada correctamente` };
  }
}
