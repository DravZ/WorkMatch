import { IsNumber } from 'class-validator';

export class CreatePostulacionDto {
  @IsNumber()
  id_usuario!: number;

  @IsNumber()
  id_vacante!: number;
}
