import {
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsIn,
  IsArray,
  IsInt,
} from 'class-validator';

export class CreateTrabajadorDto {
  // Relación con Usuario
  @IsNumber()
  idUsuario!: number;

  // Datos del trabajador
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsNumber()
  tarifa_hora?: number;

  @IsOptional()
  @IsNumber()
  trabajos_completados?: number;

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

  // Relación ManyToMany con Habilidad
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  habilidades?: number[];

  // Relación ManyToMany con CategoriaVacante
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categorias?: number[];
}