import { Test, TestingModule } from '@nestjs/testing';
import { VacanteController } from './vacante.controller';
import { VacanteService } from './vacante.service';

describe('VacanteController', () => {
  let controller: VacanteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacanteController],
      providers: [VacanteService],
    }).compile();

    controller = module.get<VacanteController>(VacanteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
