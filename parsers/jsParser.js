class JSParser {
  parseLines(lines) {
    let blank = 0,
      comment = 0,
      code = 0;
    let inBlockComment = false;

    for (let i = 0; i < lines.length; i++) {
      const trimmed = lines[i].trim();

      // Blank line check
      if (trimmed === "") {
        blank++;
        continue;
      }

      // Inside a block comment
      if (inBlockComment) {
        comment++;
        if (trimmed.includes("*/")) {
          inBlockComment = false;
        }
        continue;
      }

      // Line has code with an inline comment
      if (trimmed.includes("//") && !trimmed.startsWith("//")) {
        code++;
        continue;
      }

      // Single line comment
      if (trimmed.startsWith("//")) {
        comment++;
        continue;
      }

      // Block comment start
      if (trimmed.startsWith("/*")) {
        comment++;
        // If the comment doesn't end on this line
        if (!trimmed.includes("*/")) {
          inBlockComment = true;
        }
        continue;
      }

      // Code only
      code++;
    }

    return { blank, comment, code, total: lines.length };
  }
}

export default new JSParser();
