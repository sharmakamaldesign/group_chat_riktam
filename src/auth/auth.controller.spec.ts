import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import * as request from 'supertest';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { userProviders } from '../user/user.provider';
import { masterProviders } from '../master/master.provider';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
describe('AuthController', () => {
  let controller: AuthController;
  let app: INestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:[AuthController],
      imports: [AuthModule, UserModule],
      providers:[JwtService,UserService, ...userProviders, ...masterProviders, LocalStrategy, JwtStrategy]
    }).compile();
    // app = module.createNestApplication();
    // await app.init();

    controller = module.get<AuthController>(AuthController);

  });
    // it('/auth/login (POST)', () => {
    //   return request(app.getHttpServer())
    //   .post('/auth/login')
    //   .send({"mobile":"0000000000","password":"admin"})
    //   .expect(201)
    // });

    describe('root', () => {
      it('should return "Hello World!"', () => {
        expect(controller.login({"mobile":"0000000000","password":"admin"})).toBe('Hello World!');
      });
    });
  
  
});


// describe('Auth', () => {
//   let app: INestApplication;
//   let authService = { findAll: () => ['test'] };

//   beforeAll(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [AuthModule],
//     })
//       .overrideProvider(AuthService)
//       .useValue(AuthService)
//       .compile();

//     app = moduleRef.createNestApplication();
//     await app.init();
//   });

//   it(`/GET cats`, () => {
//     return request(app.getHttpServer())
//       .get('/auth/login')
//       .expect(201)
//   });

//   afterAll(async () => {
//     await app.close();
//   });
// });