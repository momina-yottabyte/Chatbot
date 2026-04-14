import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Document } from '@langchain/core/documents';
import { OpenAIEmbeddings } from '@langchain/openai';
import * as fs from 'fs';
import * as path from 'path';
import chokidar from 'chokidar';
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}

function splitIntoChunks(content: string, source: string): Document[] {
  const MAX_CHARS = 1000; // 🔥 key limit
  const chunks: Document[] = [];

  const cleanText = content.replace(/\s+/g, ' ').trim();

  let start = 0;
  let chunkIndex = 0;

  while (start < cleanText.length) {
    const end = start + MAX_CHARS;

    const chunkText = cleanText.slice(start, end);

    chunks.push(
      new Document({
        pageContent: chunkText,
        metadata: { source, chunk: chunkIndex++ },
      }),
    );

    start = end;
  }

  return chunks;
}

@Injectable()
export class KnowledgeBaseService implements OnModuleInit {
  private readonly logger = new Logger(KnowledgeBaseService.name);
  private embeddings: OpenAIEmbeddings | null = null;
  private vectors: number[][] = [];
  private documents: Document[] = [];

  async onModuleInit(): Promise<void> {
    //console.log('API KEY:', process.env.OPENAI_API_KEY); 
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is required to embed the knowledge base');
    }

    const datasetDir = path.join(process.cwd(), 'dataset/md');
    if (!fs.existsSync(datasetDir)) {
      throw new Error(`Dataset directory not found: ${datasetDir}`);
    }

    const files = fs
      .readdirSync(datasetDir)
      .filter((f) => f.endsWith('.md') && !f.startsWith('.'));

    if (files.length === 0) {
      this.logger.warn(`No .md files in ${datasetDir}; chat will have no HRMS context`);
      return;
    }

    const docs: Document[] = [];
    for (const file of files) {
      const full = path.join(datasetDir, file);
      // const text = fs.readFileSync(full, 'utf8');
      // docs.push(...splitIntoChunks(text, file));
      const rawText = fs.readFileSync(full, 'utf8');
      const text = rawText.replace(/<!--[\s\S]*?-->/g, '');
      // docs.push(...splitIntoChunks(text, file));
      const chunks = splitIntoChunks(text, file);
      docs.push(...chunks);
    }

    this.embeddings = new OpenAIEmbeddings({ openAIApiKey: apiKey });
    const texts = docs.map((d) => d.pageContent);
    this.vectors = await this.embeddings.embedDocuments(texts);
    this.documents = docs;

    this.logger.log(
      `Loaded ${this.documents.length} chunks from ${files.length} file(s) in dataset/`,
    );
    this.watchForChanges();
  }

  get chunkCount(): number {
    return this.documents.length;
  }

  async similaritySearch(query: string, k: number): Promise<Document[]> {
    if (!this.embeddings || this.documents.length === 0) {
      return [];
    }
    const queryVec = await this.embeddings.embedQuery(query);
    const scored = this.vectors.map((vec, i) => ({
      i,
      score: cosineSimilarity(queryVec, vec),
    }));
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, k).map((s) => this.documents[s.i]);
  }
  private watchForChanges() {
  const watchDir = path.join(process.cwd(), 'dataset/md');

  this.logger.log('👀 Watching MD folder for changes...');

  chokidar
    .watch(watchDir, { ignoreInitial: true })
    .on('add', async (filePath) => {
      if (filePath.endsWith('.md')) {
        this.logger.log(`📘 New file detected: ${filePath}`);
        await this.reloadKnowledgeBase();
      }
    });
}
async reloadKnowledgeBase(): Promise<void> {
  this.logger.log('🔄 Reloading knowledge base...');

  const datasetDir = path.join(process.cwd(), 'dataset/md');

  const files = fs
    .readdirSync(datasetDir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('.'));

  const docs: Document[] = [];

  for (const file of files) {
    const full = path.join(datasetDir, file);
    const rawText = fs.readFileSync(full, 'utf8');
    const text = rawText.replace(/<!--[\s\S]*?-->/g, '');

    const chunks = splitIntoChunks(text, file);
    docs.push(...chunks);
  }

  if (!this.embeddings) {
    const apiKey = process.env.OPENAI_API_KEY;
    this.embeddings = new OpenAIEmbeddings({ openAIApiKey: apiKey });
  }

  const texts = docs.map((d) => d.pageContent);
  this.vectors = await this.embeddings.embedDocuments(texts);
  this.documents = docs;

  this.logger.log(`✅ Reloaded ${this.documents.length} chunks`);
}
}