import { Module } from '@nestjs/common';
import { TrabajadorService } from './trabajador.service';
import { TrabajadorController } from './trabajador.controller';
import { Trabajador } from './entities/trabajador.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
   imports: [
    TypeOrmModule.forFeature([Trabajador]) 
  ],
  controllers: [TrabajadorController],
  providers: [TrabajadorService],
})
export class TrabajadorModule {}
