import { Module } from '@nestjs/common';
import { MensajeService } from './mensajes.service';
import { MensajesController } from './mensajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Mensaje } from './entities/mensaje.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
     imports: [TypeOrmModule.forFeature([Mensaje, Usuario])],
  controllers: [MensajesController],
  providers: [MensajeService],
})
export class MensajesModule {}
