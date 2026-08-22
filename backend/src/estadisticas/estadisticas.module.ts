import { Module } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Trabajador } from 'src/trabajador/entities/trabajador.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Vacante } from 'src/vacante/entities/vacante.entity';
import { Review } from 'src/review/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trabajador, Usuario, Vacante, Review]) 
  ],
  providers: [EstadisticasService],
  controllers: [EstadisticasController]
})
export class EstadisticasModule {}
