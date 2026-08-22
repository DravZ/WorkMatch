import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostulacionService } from './postulacion.service';
import { PostulacionController } from './postulacion.controller';

import { Postulacion } from './entities/postulacion.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Vacante } from 'src/vacante/entities/vacante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Postulacion,
      Usuario,
      Vacante,
    ]),
  ],

  controllers: [PostulacionController],

  providers: [PostulacionService],
})
export class PostulacionModule {}