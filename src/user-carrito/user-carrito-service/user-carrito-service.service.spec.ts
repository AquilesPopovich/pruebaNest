import { Test, TestingModule } from '@nestjs/testing';
import { UserCarritoServiceService } from './user-carrito-service.service';

describe('UserCarritoServiceService', () => {
  let service: UserCarritoServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCarritoServiceService],
    }).compile();

    service = module.get<UserCarritoServiceService>(UserCarritoServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
