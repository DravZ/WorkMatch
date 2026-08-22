import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmpresaModule } from './empresa/empresa.module';
import { VacanteModule } from './vacante/vacante.module';
import { PostulacionModule } from './postulacion/postulacion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MensajesModule } from './mensajes/mensajes.module';
import { CategoriaVacanteModule } from './categoria_vacante/categoria_vacante.module';
import { HabilidadModule } from './habilidad/habilidad.module';
import { TrabajadorModule } from './trabajador/trabajador.module';
import { ReviewModule } from './review/review.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    EmpresaModule,
    VacanteModule,
    PostulacionModule,
    UsuarioModule,
    MensajesModule,
    CategoriaVacanteModule,
    HabilidadModule,
    TrabajadorModule,
    ReviewModule,
    EstadisticasModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
