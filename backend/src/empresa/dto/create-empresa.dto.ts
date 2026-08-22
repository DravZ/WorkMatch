import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  nombre_empresa!: string;

  @IsString()
  sector!: string;

  @IsString()
  ubicacion!: string;

  @IsOptional()
  @IsUrl()
  sitio_web?: string;

  @IsOptional()
  @IsString()
  logo_url?: string;
}
