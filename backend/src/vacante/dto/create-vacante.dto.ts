import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVacanteDto {
  @IsString()
  titulo!: string;

  @IsString()
  descripcion!: string;

  @IsString()
  ubicacion!: string;

  @IsString()
  tipo_contrato!: string;

  @IsOptional()
  @IsString()
  salario?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsNumber()
  id_empresa!: number;
}