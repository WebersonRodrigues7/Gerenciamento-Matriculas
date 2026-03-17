import { Test, TestingModule } from '@nestjs/testing';

describe('AuthService', () => {
  //let service: ;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      //providers: [AuthService],
    }).compile();

    //service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
   // expect(service).toBeDefined();
  });
});
