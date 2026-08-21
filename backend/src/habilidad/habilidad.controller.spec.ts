import { Test, TestingModule } from '@nestjs/testing';
import { HabilidadController } from './habilidad.controller';
import { HabilidadService } from './habilidad.service';

describe('HabilidadController', () => {
  let controller: HabilidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabilidadController],
      providers: [HabilidadService],
    }).compile();

    controller = module.get<HabilidadController>(HabilidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
