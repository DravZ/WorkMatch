import { PartialType } from '@nestjs/swagger';
import { CreateCategoriaVacanteDto } from './create-categoria_vacante.dto';

export class UpdateCategoriaVacanteDto extends PartialType(CreateCategoriaVacanteDto) {}
