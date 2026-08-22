import { IsString, IsEmail, MinLength, IsIn } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;

  @IsIn(['work', 'hire'])
  role!: 'work' | 'hire';
}
