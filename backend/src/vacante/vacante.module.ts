import { Module } from '@nestjs/common';
import { VacanteService } from './vacante.service';
import { VacanteController } from './vacante.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacante } from './entities/vacante.entity';

@Module({
     imports: [TypeOrmModule.forFeature([Vacante])],
  controllers: [VacanteController],
  providers: [VacanteService],
})
export class VacanteModule {}
  