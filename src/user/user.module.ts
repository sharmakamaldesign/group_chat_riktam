import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';
import { masterProviders } from '../master/master.provider';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants/app.constants';

@Module({
  imports:[
    PassportModule,
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
}),
  ],
  providers: [UserService, ...userProviders, ...masterProviders],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
