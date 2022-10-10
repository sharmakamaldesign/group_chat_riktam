import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { jwtConstants } from '../common/constants/app.constants';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[
        UserModule,
        PassportModule,
        JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: process.env.TOKEN_EXPIRATION }})],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
