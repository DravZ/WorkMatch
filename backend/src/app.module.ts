import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmpresaModule } from './empresa/empresa.module';
import { VacanteModule } from './vacante/vacante.module';
import { PostulacionModule } from './postulacion/postulacion.module';
import { UsuarioModule } from './usuario/usuario.module';
import { MensajesModule } from './mensajes/mensajes.module';
import { CategoriaVacanteModule } from './categoria_vacante/categoria_vacante.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),

    EmpresaModule,
    VacanteModule,
    PostulacionModule,
    UsuarioModule,
    MensajesModule,
    CategoriaVacanteModule,
    
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}