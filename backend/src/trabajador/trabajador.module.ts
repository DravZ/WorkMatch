import { Module } from '@nestjs/common';
import { TrabajadorService } from './trabajador.service';
import { TrabajadorController } from './trabajador.controller';
import { Trabajador } from './entities/trabajador.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Habilidad } from 'src/habilidad/entities/habilidad.entity';
import { CategoriaVacante } from 'src/categoria_vacante/entities/categoria_vacante.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Trabajador,
      Usuario,
      Habilidad,
      CategoriaVacante,
    ])
  ],
  controllers: [TrabajadorController],
  providers: [TrabajadorService],
})
export class TrabajadorModule { }
