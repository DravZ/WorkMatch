import { Module } from '@nestjs/common';
import { CategoriaVacanteService } from './categoria_vacante.service';
import { CategoriaVacanteController } from './categoria_vacante.controller';
import { CategoriaVacante } from './entities/categoria_vacante.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriaVacante]), 
  ],
  controllers: [CategoriaVacanteController],
  providers: [CategoriaVacanteService],
})
export class CategoriaVacanteModule {}
