import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';
import { masterProviders } from 'src/master/master.provider';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants/app.constants';

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
