import { Module } from '@nestjs/common';
import { VacanteService } from './vacante.service';
import { VacanteController } from './vacante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacante } from './entities/vacante.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { CategoriaVacante } from 'src/categoria_vacante/entities/categoria_vacante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vacante, Empresa, CategoriaVacante])],
  controllers: [VacanteController],
  providers: [VacanteService],
})
export class VacanteModule {}
