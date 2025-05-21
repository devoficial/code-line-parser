import { readFileLines } from './utils/fileReader.js';
import { getParser } from './factory.js';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node index.js <file-path>');
  process.exit(1);
}

try {
  const lines = readFileLines(filePath);
  const parser = getParser(filePath);

  if (!parser) {
    console.error('No parser available for this file type.');
    process.exit(1);
  }

  const result = parser.parseLines(lines);
  console.log('Compliation Complete:');
  console.table(result);
} catch (err) {
  console.error('Error:', err.message);
  process.exit(1);
}
