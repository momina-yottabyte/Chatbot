import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { OpenAIEmbeddings } from '@langchain/openai';
import { Chroma } from '@langchain/community/vectorstores/chroma';
@Injectable()
export class ChatbotService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async handleMessage(message: string): Promise<string> {

    // 1. Load embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // 2. Connect to vector DB
    const vectorStore = await Chroma.fromExistingCollection(embeddings, {
      collectionName: "hrms_docs",
        url: "http://localhost:8000",
    });

    // 3. Search relevant docs
    const results = await vectorStore.similaritySearch(message, 3);

    const context = results.map(r => r.pageContent).join("\n");

    // 4. Send to AI with context
    const response = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an HRMS assistant. Answer only based on the provided context.

Context:
${context}`
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    return response.choices[0].message.content || "No response";
  }
}