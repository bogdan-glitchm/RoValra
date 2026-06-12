import DOMPurify from 'dompurify';

const SANITIZE_PROFILE = Symbol('SANITIZE_PROFILE');
const mkprof = (config) => Object.freeze([{...config, [SANITIZE_PROFILE]: true}]);

/**
 *  @type {{
 *      Untrusted: {
 *          Default: [object],
 *          Markdown: [object]
 *      },
 *      Default: [object]
 * }}
 */
export const sanitize = Object.freeze({
    Untrusted: {
        Default: mkprof({
            ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'u', 's', 'p', 'div', 'span', 'br', 'ul', 'ol', 'li', 'code'],
            ALLOWED_ATTR: []
        }),
        Markdown: mkprof({
            ALLOWED_TAGS: ['b', 'i', 'u', 'code', 'br'],
            ALLOWED_ATTR: []
        })
    },
    Default: mkprof({}),
    HTMLOnly: mkprof({
        USE_PROFILES: { html: true }
    })
});

export const sanitizeHTML = (strings, ...values) => {
    let result = strings[0];
    let profile = [];
    values.forEach((val, i) => {
        if (val && typeof val === 'object' && val[0] && typeof val[0] === 'object' && val[0][SANITIZE_PROFILE] === true) {
            const valueStr = '';
            result += valueStr + strings[i + 1];
            profile = val;
            return;
        }
        const valueStr = (val === null || val === undefined) ? '' : String(val);
        result += valueStr + strings[i + 1];
    });
    return DOMPurify.sanitize(result, ...profile);
};

export const safeHtml = (strings, ...values) => {
    let result = strings[0];
    let profile = [];
    values.forEach((val, i) => {
        if (val && typeof val === 'object' && val[0] && typeof val[0] === 'object' && val[0][SANITIZE_PROFILE] === true) {
            const valueStr = '';
            result += valueStr + strings[i + 1];
            profile = val;
            return;
        }
        const valueStr = (val === null || val === undefined) ? '' : String(val);
        const escaped = valueStr
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        result += escaped + strings[i + 1];
    });
    return DOMPurify.sanitize(result, ...profile);
};

export default DOMPurify;
