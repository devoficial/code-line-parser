import path from 'path';
import jsParser from './parsers/jsParser.js';

// Register more parsers here
const registry = {
  '.js': jsParser,
};

function getParser(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return registry[ext] || null;
}

export { getParser };
