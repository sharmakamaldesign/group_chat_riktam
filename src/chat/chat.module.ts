import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { chatProviders } from './chat.provider';

@Module({
  providers: [ChatService, ...chatProviders],
  controllers: [ChatController]
})
export class ChatModule {}
