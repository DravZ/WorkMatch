import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  nombre_empresa!: string;

  @IsString()
  sector!: string;

  @IsString()
  ubicacion!: string;

  @IsString()
  sitio_web!: string;

  @IsString()
  descripcion!: string;

  @IsOptional()
  @IsString()
  logo_url?: string;

  @IsInt()
  id_usuario!: number;
}