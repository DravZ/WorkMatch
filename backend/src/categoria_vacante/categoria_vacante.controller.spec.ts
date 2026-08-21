import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaVacanteController } from './categoria_vacante.controller';
import { CategoriaVacanteService } from './categoria_vacante.service';

describe('CategoriaVacanteController', () => {
  let controller: CategoriaVacanteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriaVacanteController],
      providers: [CategoriaVacanteService],
    }).compile();

    controller = module.get<CategoriaVacanteController>(CategoriaVacanteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
