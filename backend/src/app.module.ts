import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';



import { EmpresaModule } from './empresa/empresa.module';
import { VacanteModule } from './vacante/vacante.module';
import { MensajesModule } from './mensajes/mensajes.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PostulacionModule } from './postulacion/postulacion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'Workmatch',

      autoLoadEntities: true,

     
      synchronize: true,
    }),

    EmpresaModule,
    VacanteModule,
    MensajesModule,
    UsuarioModule,
    PostulacionModule,
  ],
})
export class AppModule {}