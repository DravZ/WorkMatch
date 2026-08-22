import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMensajeDto {
  @IsNumber()
  emisorIdUsuario!: number;

  @IsNumber()
  receptorIdUsuario!: number;

  @IsString()
  contenido!: string;

  @IsOptional()
  @IsBoolean()
  leido?: boolean;
}
