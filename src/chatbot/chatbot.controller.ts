import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  async chat(@Body() body: { message: string }) {
    const response = await this.chatbotService.handleMessage(body.message);
    return { response };
  }
}