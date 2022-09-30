import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("node env is ============",process.env.NODE_ENV)
  const app = await NestFactory.create(AppModule,{cors:true});
  const port = process.env.PORT || 3333;
  app.enableCors();
  app.setGlobalPrefix('');
  const config = new DocumentBuilder()
    .setTitle('Group Chat APIs')
    .setDescription('Group Chat')
      .setVersion('1.0')
      .addTag('svc')
    .addBearerAuth({
      type: 'http', scheme: 'bearer', bearerFormat: 'Token',
    }, 'access-token')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document,{
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  
  await app.listen(port);
}
bootstrap();

