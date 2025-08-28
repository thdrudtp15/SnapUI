import prettier from 'prettier';
import parserHtml from 'prettier/parser-html';

export const formatHtml = async (html: string) => {
    if (!html) return '';

    const result = await prettier.format(html, {
        parser: 'html',
        plugins: [parserHtml],
        printWidth: 80, // 한 줄 최대 길이
        tabWidth: 2, // 들여쓰기 폭
        useTabs: false, // 탭 대신 공백
        htmlWhitespaceSensitivity: 'ignore', // 공백 무시 않고 포맷
    });

    return result;
};
