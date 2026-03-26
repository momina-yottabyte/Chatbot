import {
  BadRequestException,
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { ChatRequestDto } from './dto/chat-request.dto';
import { ChatResponseDto } from './dto/chat-response.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post()
  @ApiOperation({ summary: 'Send a message to the HRMS assistant' })
  @ApiBody({ type: ChatRequestDto })
  @ApiOkResponse({ type: ChatResponseDto })
  @ApiBadRequestResponse({ description: 'Missing or empty message' })
  async chat(@Body() body: ChatRequestDto) {
    const message = body?.message?.trim();
    if (!message) {
      throw new BadRequestException('message is required and must be non-empty');
    }
    const response = await this.chatbotService.handleMessage(message);
    return { response };
  }
}
