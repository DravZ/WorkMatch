import { IsString } from 'class-validator';

export class CreateCategoriaVacanteDto {
  @IsString()
  nombre!: string;
}
