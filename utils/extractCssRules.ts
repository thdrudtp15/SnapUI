export function extractCSSRules(cssString: string, selectors: string[]) {
    const regex = /([.#]?[a-zA-Z0-9_-]+(?:\s*,\s*[.#]?[a-zA-Z0-9_-]+)*)\s*\{([\s\S]*?)\}/g;
    return cssString?.replace(regex, (match, selector, body) => {
        if (/^\/\*[\s\S]*\*\/$/.test(match.trim())) {
            return match;
        }

        const selList = selector.split(',').map((s: string) => s.trim());
        const keep = selList.some((s: string) => selectors.includes(s));
        return keep ? match : `/* ${match} */`;
    });
}
