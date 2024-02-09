import { Test, TestingModule } from '@nestjs/testing';
import { UserCarritoControllerController } from './user-carrito-controller.controller';

describe('UserCarritoControllerController', () => {
  let controller: UserCarritoControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCarritoControllerController],
    }).compile();

    controller = module.get<UserCarritoControllerController>(UserCarritoControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
