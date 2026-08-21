import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Review } from './entities/review.entity';
import { Trabajador } from 'src/trabajador/entities/trabajador.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Trabajador, Usuario])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
