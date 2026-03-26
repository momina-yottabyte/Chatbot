import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAI from 'openai';
import { KnowledgeBaseService } from './knowledge-base.service';

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

  async handleMessage(message: string): Promise<string> {
    const model = process.env.OPENAI_CHAT_MODEL ?? 'gpt-4o-mini';
    const results = await this.knowledgeBase.similaritySearch(message, 4);
    const context = results.map((r) => r.pageContent).join('\n\n---\n\n');

    const systemContent =
      context.trim().length > 0
        ? `You are an HRMS product assistant. Answer using only the context below. If the answer is not in the context, say you do not have that information in the HRMS guide.\n\nContext:\n${context}`
        : `You are an HRMS product assistant. No knowledge-base documents were loaded. Say you do not have HRMS documentation loaded yet and suggest adding .md files under the dataset/ folder.`;

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
