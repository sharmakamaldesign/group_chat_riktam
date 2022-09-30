import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MasterModule } from './master/master.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { InterceptorsService } from './common/services/interceptors/interceptors.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DatabaseModule } from './common/database/database.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({isGlobal:true}),DatabaseModule, MasterModule, ChatModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: InterceptorsService,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },],
})
export class AppModule {}
