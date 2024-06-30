import { Test, TestingModule } from '@nestjs/testing';
import { ManagerBankController } from './manager.controller';

describe('ManagerBankController', () => {
  let controller: ManagerBankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagerBankController],
    }).compile();

    controller = module.get<ManagerBankController>(ManagerBankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
