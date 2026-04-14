import * as fs from 'fs';
import * as path from 'path';
import * as mammoth from 'mammoth';
import TurndownService from 'turndown';

const turndownService = new TurndownService();

const inputDir = path.join(process.cwd(), 'dataset/word');
const outputDir = path.join(process.cwd(), 'dataset/md');

export async function convertDocxToMd() {
  if (!fs.existsSync(inputDir)) {
    console.error('❌ word folder not found');
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.docx'));

  if (files.length === 0) {
    console.log('⚠️ No .docx files found');
    return;
  }

  for (const file of files) {
    const filePath = path.join(inputDir, file);

    // Step 1: DOCX → HTML
    const result = await mammoth.convertToHtml({ path: filePath });

    // Step 2: HTML → Markdown
    const markdown = turndownService.turndown(result.value);

    const outputFile = file.replace('.docx', '.md');
    const outputPath = path.join(outputDir, outputFile);

    fs.writeFileSync(outputPath, markdown, 'utf8');

    console.log(`✅ Converted: ${file} → ${outputFile}`);
  }
}

convertDocxToMd();