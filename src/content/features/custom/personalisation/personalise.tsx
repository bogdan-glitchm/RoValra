import { observeElement } from '../../../core/observer.js';

const CONFIG = Object.freeze({
    PERS_PATH:  "/rovalra-custom/personalise",
    SETTING_EVENT_NAME: "rovalra:more-personalisation"
} as const);

function normalizePath(pathname: string = window.location.pathname): string {
    return pathname.toLowerCase().replace(/^\/[a-z]{2}(?:-[a-z]{2})?\//, '/');
}

function isThemesPath(): boolean {
    return normalizePath() === CONFIG.PERS_PATH;
}


function redirectToPerspage() {
    window.location.assign(CONFIG.PERS_PATH);
}

async function Render(content: HTMLElement) {
    content.dataset.rovalraPersPage = 'true';
    content.innerHTML = '';


}

async function OnReady(content: HTMLElement) {
    try {
        Render(content);
    } catch (e) {
        console.error(`RoValra: Failed to load personalisation page.`, e);
    }
}



let initialised = false;

export function init() {
    if (!initialised) {
        initialised = true;
        document.addEventListener(CONFIG.SETTING_EVENT_NAME, redirectToPerspage);
    }

    if (isThemesPath()) {
        observeElement('.content#content, #content', (content: HTMLElement) => {
            OnReady(content);
        });
    }
}
