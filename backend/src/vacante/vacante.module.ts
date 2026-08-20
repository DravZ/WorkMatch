import { Module } from '@nestjs/common';
import { VacanteService } from './vacante.service';
import { VacanteController } from './vacante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacante } from './entities/vacante.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Module({
     imports: [TypeOrmModule.forFeature([Vacante, Empresa])],
  controllers: [VacanteController],
  providers: [VacanteService],
})
export class VacanteModule {}
