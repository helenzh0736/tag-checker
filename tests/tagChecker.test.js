const checker = require('../tagChecker');

describe('tagChecker',()=>{
    it("should return 'Correctly tagged paragraph' if input is correctly nested with all valid tags",()=>{
        const result = checker.tagChecker("The following text<C><B>is centred and in boldface</B></C>");
        expect(result).toBe('Correctly tagged paragraph');
    });

    it("should return 'Correctly tagged paragraph' if input is correctly nested but with some invalid tags in the middle",()=>{
        const result = checker.tagChecker("<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence");
        expect(result).toBe('Correctly tagged paragraph');
    });

    it("should return 'Expected </C> found </B>' if input has wrongly nested tags",()=>{
        const result = checker.tagChecker("<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>");
        expect(result).toBe('Expected </C> found </B>');
    });

    it("should return 'Expected # found </C>' if input has an extra closing tag </C>",()=>{
        const result = checker.tagChecker("<B>This should be in boldface, but there is an extra closing tag</B></C>");
        expect(result).toBe('Expected # found </C>');
    });

    it("should return 'Expected </B> found #' if input has a missing closing tag </B>",()=>{
        const result = checker.tagChecker("<B><C>This should be centred and in boldface, but there is a missing closing tag</C>");
        expect(result).toMatch('Expected </B> found #');
    });

    it("should return 'Expected </C> found #' and ' Expected </B> found #' if input has 2 missing closing tags </B> and </C>",()=>{
        const result = checker.tagChecker("<B><C>This should be centred and in boldface, but there is a missing closing tag");
        const pattern = /^(?=.*Expected <\/B> found #)(?=.*Expected <\/C> found #).*$/;
        expect(result).toMatch(pattern);
    });
})