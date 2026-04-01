import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAI from 'openai';
import { KnowledgeBaseService } from './knowledge-base.service';
import { intents } from '../../dataset/intent-data'; 

@Injectable()
export class ChatbotService {
  private openaiClient: OpenAI | null = null;

  constructor(private readonly knowledgeBase: KnowledgeBaseService) {}

  private getOpenAI(): OpenAI {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      
      throw new ServiceUnavailableException('OPENAI_API_KEY is not configured');
    }
    if (!this.openaiClient) {
      this.openaiClient = new OpenAI({ apiKey });
    }
    return this.openaiClient;
  }

  /**
   * Simple intent matcher:
   * Checks if the user message matches any example phrases in intent-data.ts
   * Returns the predefined response if matched, otherwise null.
   */
  private matchIntent(message: string): string | null {
    const msg = message.toLowerCase();
    for (const intent of intents) {
      for (const example of intent.examples) {
        if (msg.includes(example.toLowerCase())) {
          return intent.response;
        }
      }
    }
    return null; // no intent matched
  }

  /**
   * Main message handler:
   * 1. Check intent first
   * 2. If no intent, fallback to RAG similarity search using hrms-guide.md
   */
  async handleMessage(message: string): Promise<string> {
    // Step 1: Intent-based response
    const intentResponse = this.matchIntent(message);
    if (intentResponse) {
      return intentResponse;
    }

    // Step 2: RAG-based response
    const model = process.env.OPENAI_CHAT_MODEL ?? 'gpt-4o-mini';
    const results = await this.knowledgeBase.similaritySearch(message, 4);
    const context = results.map((r) => r.pageContent).join('\n\n---\n\n');

    const systemContent =
      context.trim().length > 0
        ? `You are an HRMS product assistant. Answer using only the context below. If the answer is not in the context, say you do not have that information in the HRMS guide.\n\nContext:\n${context}`
        : `You are an HRMS product assistant. No knowledge-base documents were loaded. Say you do not have the documentation loaded and are suggested adding .md files under the dataset/ folder.`;

    const response = await this.getOpenAI().chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemContent },
        { role: 'user', content: message },
      ],
    });

    return response.choices[0].message.content ?? 'No response';
  }
}