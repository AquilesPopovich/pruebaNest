import { Test, TestingModule } from '@nestjs/testing';
import { ProfileServiceService } from './profile-service.service';

describe('ProfileServiceService', () => {
  let service: ProfileServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileServiceService],
    }).compile();

    service = module.get<ProfileServiceService>(ProfileServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
