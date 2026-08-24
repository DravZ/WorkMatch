import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { EstadoVacante } from '../enums/estado-vacante.enum';

export class CreateVacanteDto {
  @IsNumber()
  id_empresa!: number;

  @IsNumber()
  id_categoria!: number;

  @IsString()
  titulo!: string;

  @IsString()
  descripcion!: string;

  @IsString()
  ubicacion!: string;

  @IsOptional()
  @IsString()
  salario?: string;

  @IsOptional()
  @IsDateString()
  fecha_inicio?: string;

  @IsOptional()
  @IsDateString()
  fecha_publicacion?: string;

  @IsOptional()
  @IsNumber()
  empleados_necesarios?: number;

  @IsOptional()
  @IsString()
  horario?: string;

  @IsOptional()
  @IsString()
  duracion_estimada?: string;

  @IsOptional()
  @IsString()
  requerimientos?: string;

  @IsOptional()
  @IsString()
  habilidades_optimas?: string;

  @IsOptional()
  @IsEnum(EstadoVacante)
  estado?: EstadoVacante;

  @IsOptional()
  @IsBoolean()
  urgente?: boolean;

  @IsEnum(['hora', 'fijo'])
  tipo_pago!: 'hora' | 'fijo';
}
