import fs from 'fs';
import path from 'path';

export function readFileLines(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const stat = fs.statSync(filePath);
  if (!stat.isFile()) {
    throw new Error(`Not a valid file: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  return content.split('\n');
}

