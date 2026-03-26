import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { KnowledgeBaseService } from './knowledge-base.service';

@Module({
  providers: [KnowledgeBaseService, ChatbotService],
  controllers: [ChatbotController],
})
export class ChatbotModule {}
