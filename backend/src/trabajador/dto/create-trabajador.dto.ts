import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

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
  @IsBoolean()
  is_verified?: boolean;

  @IsOptional()
  @IsString()
  disponibilidad?: string;
}
