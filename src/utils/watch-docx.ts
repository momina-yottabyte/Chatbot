import * as path from 'path';
import chokidar from 'chokidar';
import { convertDocxToMd } from './docx-to-md';

const watchDir = path.join(process.cwd(), 'dataset/word');

console.log('👀 Watching for new .docx files...');

chokidar
  .watch(watchDir, { ignoreInitial: true })
  .on('add', async (filePath) => {
    if (filePath.endsWith('.docx')) {
      console.log(`📄 New file detected: ${filePath}`);

      try {
        await convertDocxToMd();
        console.log('✅ Auto conversion complete');
      } catch (err) {
        console.error('❌ Conversion failed:', err);
      }
    }
  });