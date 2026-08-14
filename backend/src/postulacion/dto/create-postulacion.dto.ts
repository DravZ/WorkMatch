import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostulacionDto {
  @IsNumber()
  id_usuario!: number; 

  @IsNumber()
  id_vacante!: number;   

  @IsOptional()
  @IsString()
  estado?: string;     
}
