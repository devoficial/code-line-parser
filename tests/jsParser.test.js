import jsParser from '../parsers/jsParser.js';

test('JSParser correctly classifies lines', () => {
  const lines = [
    '',
    '   ',
    '// single-line comment',
    '/* multi-line',
    'comment block */',
    'const a = 5;',
    'console.log(a); // inline comment',
    '/* start block',
    'still in comment',
    'ends here */',
    'return a;'
  ];

  const result = jsParser.parseLines(lines);

  expect(result).toEqual({
    blank: 2,
    comment: 6,
    code: 3,
    total: 11
  });
});
