import { IsString } from 'class-validator';

export class CreateHabilidadDto {
  @IsString()
  nombre!: string;
}
