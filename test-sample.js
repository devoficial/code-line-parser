import fs from 'fs';
import jsParser from './parsers/jsParser.js';

// Read the sample file
const samplePath = './sample/index.js';
const fileContent = fs.readFileSync(samplePath, 'utf8');
const lines = fileContent.split('\n');

// Parse the lines
const result = jsParser.parseLines(lines);

// Log the result
console.log('Analysis of sample file:');
console.log(result);

// Log each line with its classification for debugging
console.log('\nLine by line analysis:');
let inBlockComment = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  let type = '';

  if (trimmed === '') {
    type = 'BLANK';
  } else if (inBlockComment) {
    type = 'COMMENT (block)';
    if (trimmed.includes('*/')) {
      inBlockComment = false;
    }
  } else if (trimmed.includes('//') && !trimmed.startsWith('//')) {
    type = 'CODE (with inline comment)';
  } else if (trimmed.startsWith('//')) {
    type = 'COMMENT (single-line)';
  } else if (trimmed.startsWith('/*')) {
    type = 'COMMENT (block start)';
    if (!trimmed.includes('*/')) {
      inBlockComment = true;
    }
  } else {
    type = 'CODE';
  }

  console.log(`Line ${i+1}: ${type} | ${line}`);
} 