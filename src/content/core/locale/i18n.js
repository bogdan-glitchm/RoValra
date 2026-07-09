import i18next from 'i18next';
import { GetAssetManagerAsync } from '../assets/assetManager';

let i18nInitialized = false;
const i18nPromise = (async () => {
    if (i18nInitialized) return;

    try {
        const assetManager = await GetAssetManagerAsync();
        const settings = await new Promise(
            (resolve) => chrome.storage.local.get({ language: 'en' }, resolve), //Place holder in case that wasnt clear.
        );
        const language = settings.language || 'en';

        const response = await assetManager.readAssetFile("UX.locale", {"%1": language});
        const translations = await response.json();

        await i18next.init({
            lng: language,
            fallbackLng: 'en',
            debug: false,
            resources: {
                [language]: {
                    translation: translations,
                },
            },
        });
        i18nInitialized = true;
    } catch (error) {
        console.error('RoValra: Failed to initialize i18n', error);

        i18nInitialized = true;
        throw error;
    }
})();

/**
 * Asynchronously gets a translation. This is the preferred method as it guarantees
 * the translation resources are loaded before returning a value.
 * @param {string} key The translation key.
 * @param {object} [options] i18next options.
 * @returns {Promise<string>} The translated string.
 */
export async function t(key, options) {
    await i18nPromise;
    return i18next.t(key, options);
}

/**
 * Synchronously gets a translation. If i18n is not yet initialized, it will
 * return the key itself as a fallback.
 * @param {string} key The translation key.
 * @param {object} [options] i18next options.
 * @returns {string} The translated string or the key if not available.
 */
export function ts(key, options) {
    return i18next.t(key, options);
}
