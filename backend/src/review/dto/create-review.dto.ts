import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  rating!: number;

  @IsOptional()
  @IsString()
  comentario?: string;

  @IsInt()
  trabajadorId!: number;

  @IsInt()
  empleadorId!: number;
}
