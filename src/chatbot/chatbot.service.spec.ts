import { Test, TestingModule } from '@nestjs/testing';
import { Document } from '@langchain/core/documents';
import { ChatbotService } from './chatbot.service';
import { KnowledgeBaseService } from './knowledge-base.service';
import { describe, beforeEach, it } from 'node:test';

describe('ChatbotService', () => {
  let service: ChatbotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatbotService,
        {
          provide: KnowledgeBaseService,
          useValue: {
            similaritySearch: jest.fn().mockResolvedValue([
              new Document({ pageContent: 'Sample HRMS context', metadata: {} }),
            ]),
          },
        },
      ],
    }).compile();

    service = module.get<ChatbotService>(ChatbotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
