import { Module } from '@nestjs/common';
import { PostulacionService } from './postulacion.service';
import { PostulacionController } from './postulacion.controller';
import { Postulacion } from './entities/postulacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
     imports: [TypeOrmModule.forFeature([Postulacion])],
  controllers: [PostulacionController],
  providers: [PostulacionService],
})
export class PostulacionModule {}
