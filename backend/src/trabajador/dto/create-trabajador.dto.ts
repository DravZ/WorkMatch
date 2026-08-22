import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsIn,
} from 'class-validator';

export class CreateTrabajadorDto {
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsNumber()
  tarifa_hora?: number;

  @IsOptional()
  @IsString()
  experiencia?: string;

  @IsOptional()
  @IsNumber()
  calificacion?: number;

  @IsOptional()
  @IsNumber()
  total_calificaciones?: number;

  @IsOptional()
  @IsString()
  especialidad_carrera?: string;

  @IsOptional()
  @IsIn([
    'Delivery',
    'Moving',
    'Construction',
    'Cleaning',
    'Events',
    'Hospitality',
    'Administrative',
    'Security',
  ])
  area_trabajo?: string;

  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @IsOptional()
  @IsString()
  disponibilidad?: string;
}
