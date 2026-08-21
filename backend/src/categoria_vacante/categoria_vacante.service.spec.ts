import { Test, TestingModule } from '@nestjs/testing';
import { CategoriaVacanteService } from './categoria_vacante.service';

describe('CategoriaVacanteService', () => {
  let service: CategoriaVacanteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriaVacanteService],
    }).compile();

    service = module.get<CategoriaVacanteService>(CategoriaVacanteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
