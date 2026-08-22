import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateMensajeDto {
  @IsNumber()
  emisorIdUsuario!: number;

  @IsNumber()
  receptorIdUsuario!: number;

  @IsString()
  contenido!: string;

  @IsOptional()
  leido?: boolean;
}
