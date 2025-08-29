import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserCss from 'prettier/parser-postcss';

export const formatHtml = async (html: string) => {
    if (!html) return '';

    try {
        const result = await prettier.format(html, {
            parser: 'html',
            plugins: [parserHtml],
            printWidth: 30,
            tabWidth: 2,
            useTabs: false,
            htmlWhitespaceSensitivity: 'ignore',
        });
        return result;
    } catch (e) {
        console.warn('HTML 포맷 실패:', e);
        return html; // 실패하면 원본 그대로 반환
    }
};

export const formatCss = async (css: string) => {
    if (!css) return;

    try {
        const result = await prettier.format(css, {
            parser: 'css',
            plugins: [parserCss],
            printWidth: 30,
            useTabs: false,
            htmlWhitespaceSensitivity: 'ignore',
        });
        return result;
    } catch (e) {
        console.warn('CSS 포멧', e);
        return css;
    }
};
