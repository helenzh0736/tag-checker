module.exports.tagChecker = function (paragraph) {
  const patternOpenTag = /^\<[A-Z]\>+$/,
    patternCloseTag = /^\<\/[A-Z]\>+$/;
  let stack = [];
  let i = 0;
  while (i <= paragraph.length - 3) {
    if (paragraph[i] !== "<") {
      i++;
      continue;
    }
    const next3Letter = paragraph.substr(i, 3);
    if (patternOpenTag.test(next3Letter)) {
      //Check if this is an opening tag, if it is, push it to the stack
      stack.push(next3Letter);
      i = i + 3;
    } else if (patternCloseTag.test(paragraph.substr(i, 4))) {
      //Check if this is a closing tag, if it is, compare with the last opening tag(if exist) in the stack
      const closeTagLetter = paragraph.substr(i + 2, 1);
      const lastOpenTag = stack.pop();
      if (!lastOpenTag) return `Expected # found </${closeTagLetter}>`;
      const openTagLetter = lastOpenTag.substr(1, 1);
      if (openTagLetter !== closeTagLetter) return `Expected </${openTagLetter}> found </${closeTagLetter}>`;
      i = i + 4;
    } else {
      i++;
    }
  }
  //Check if the stack is empty, if it is not, that means there are unmacthed opening tags, and there could be more than one.
  if (stack.length === 0) return "Correctly tagged paragraph";
  let result = "";
  while (stack.length > 0) {
    const tag = stack.pop();
    const expectedCloseTagLetter = tag.substr(1, 1);
    result += `Expected </${expectedCloseTagLetter}> found # \n`;
  }
  return result;
};
