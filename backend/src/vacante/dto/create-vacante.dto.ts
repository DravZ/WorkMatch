import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateVacanteDto {
  @IsString()
  titulo!: string;

  @IsString()
  descripcion!: string;

  @IsString()
  ubicacion!: string;

  @IsEnum(['hora', 'fijo'])
  tipo_pago!: 'hora' | 'fijo';

  @IsOptional()
  @IsString()
  salario?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsNumber()
  id_empresa!: number;
}
