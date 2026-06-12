import { marked } from 'marked'; // Better markdown!!!
import { sanitizeHTML, sanitize, safeHtml } from '../../core/packages/dompurify';

export function parseMarkdown(text, themeColors = {}) {
    if (!text) return '';

    let processedText = text.replace(
        /\{\{(.*?) ([a-zA-Z0-9#-_]+)\}\}/g,
        (match, content, colorName) => {
            const colorValue = themeColors[colorName] || colorName || 'inherit';
            return `<span style="color:${colorValue};">${content}</span>`;
        },
    );

    processedText = processedText.replace(/^(\s*)-\s+/gm, '$1• ');

    marked.setOptions({
        gfm: true,
        breaks: true,
    });

    return `<div class="rovalra-markdown">${marked.parse(processedText)}</div>`;
}

/**
 * Format markdown from untrusted sources
 * @param {string} text
 * @returns {string} Safe HTML render
 */
export function parseUntrustedMarkdown(text) {
    if (!text) return '';
    text = safeHtml`${sanitize.Untrusted.Markdown}${text}`;

    // Headings
    text = text.replace(/^# (.*)$/m, (match, heading) => {
        return `<u><b>${heading}</b></u><br>`;
    }); // allow ONE heading which is just bold text + newline

    // Bold Text
    text = text.replaceAll(/\*\*(.*?)\*\*/g, (match, bold) => {
        return `<b>${bold}</b>`;
    });

    text = text.replaceAll(/__(.*?)__/g, (match, bold) => {
        return `<b>${bold}</b>`;
    });

    // Italic Text
    text = text.replaceAll(/\*(.*?)\*/g, (match, italic) => {
        return `<i>${italic}</i>`;
    });

    text = text.replaceAll(/_(.*?)_/g, (match, italic) => {
        return `<i>${italic}</i>`;
    });

    // Inline Codeblocks
    text = text.replaceAll(/`(.*?)`/g, (match, codeblock) => {
        return `<code>${codeblock}</code>`;
    });

    text = text.replaceAll(/\r\n|\r|\n/g, '<br>');

    return sanitizeHTML`${sanitize.Untrusted.Markdown}${text}`.trim();
}
