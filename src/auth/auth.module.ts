import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/constants/app.constants';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    UserModule,
    PassportModule,
    JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
}),],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
