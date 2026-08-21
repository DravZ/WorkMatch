import { Module } from '@nestjs/common';
import { HabilidadService } from './habilidad.service';
import { HabilidadController } from './habilidad.controller';
import { Habilidad } from './entities/habilidad.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Habilidad]) 
  ],
  controllers: [HabilidadController],
  providers: [HabilidadService],
})
export class HabilidadModule {}
