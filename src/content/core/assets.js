import { GetAssetManager, GetAssetManagerAsync } from "./assets/assetManager";

let resolvedAssets = null;
let useOldRovalraLogo = false;
let rovalraLogoPreferenceLoaded = false;
let rovalraLogoPreferencePromise = null;

const assetManager = GetAssetManager();

const ROVALRA_LOGO_SETTING_NAME = 'useOldRovalraLogo';
const ROVALRA_LOGO_DEPENDENT_ASSETS = [
    'rovalraIcon',
    'donatorTier1Icon',
    'donatorTier2Icon',
    'donatorTier3Icon',
    'donatorDiamondIcon',
];

function resolveAssetPath(path) {
    if (
        path.startsWith('data:') ||
        path.startsWith('http:') ||
        path.startsWith('https:')
    ) {
        return path;
    }

    return chrome.runtime.getURL(path);
}

function getRovalraLogoPath() {
    return useOldRovalraLogo
        ? assetManager.resolveAssetPathSync("UI.oldRovalraIcon")
        : assetManager.resolveAssetPathSync("UI.rovalraIcon");
}

function getAssetPath(assetName) {
    if (assetName === 'UI.rovalraIcon') return getRovalraLogoPath();
    if (
        useOldRovalraLogo &&
        [
            'UI.donatorTier1Icon',
            'UI.donatorTier2Icon',
            'UI.donatorTier3Icon',
            'UI.donatorDiamondIcon',
        ].includes(assetName)
    ) {
        return assetManager.resolveAssetPathSync("UI.oldRovalraIcon");
    }

    return assetManager.resolveAssetPathSync(assetName);
}

function updateResolvedDynamicAssets() {
    if (!resolvedAssets) return;
    ROVALRA_LOGO_DEPENDENT_ASSETS.forEach((assetName) => {
        resolvedAssets[assetName] = getAssetPath("UI." + assetName);
    });
}

export function updateAssetElements(assetName = 'rovalraIcon', root = null) {
    root = root || (typeof document !== 'undefined' ? document : null);
    if (!root?.querySelectorAll) return;

    const assetUrl = getAssets()[assetName];
    if (!assetUrl) return;

    root.querySelectorAll(`[data-rovalra-asset="${assetName}"]`).forEach(
        (element) => {
            if ('src' in element) element.src = assetUrl;
        },
    );

    root.querySelectorAll(`[data-rovalra-asset-mask="${assetName}"]`).forEach(
        (element) => {
            element.style.webkitMask = `url("${assetUrl}") center / contain no-repeat`;
            element.style.mask = `url("${assetUrl}") center / contain no-repeat`;
        },
    );
}

function setRovalraLogoPreference(value) {
    const nextValue = value === true;
    if (useOldRovalraLogo === nextValue && rovalraLogoPreferenceLoaded) return;

    useOldRovalraLogo = nextValue;
    rovalraLogoPreferenceLoaded = true;
    updateResolvedDynamicAssets();
    ROVALRA_LOGO_DEPENDENT_ASSETS.forEach((assetName) => {
        updateAssetElements(assetName);
    });

    if (typeof document !== 'undefined') {
        document.dispatchEvent(
            new CustomEvent('rovalra:assetsUpdated', {
                detail: { assetNames: ROVALRA_LOGO_DEPENDENT_ASSETS },
            }),
        );
    }
}

export function isUsingOldRovalraLogo() {
    loadRovalraLogoPreference();
    return useOldRovalraLogo;
}

function loadRovalraLogoPreference() {
    if (
        rovalraLogoPreferenceLoaded ||
        rovalraLogoPreferencePromise ||
        typeof chrome === 'undefined' ||
        !chrome.storage?.local
    ) {
        return rovalraLogoPreferencePromise;
    }

    rovalraLogoPreferencePromise = chrome.storage.local
        .get({ [ROVALRA_LOGO_SETTING_NAME]: false })
        .then((settings) => {
            setRovalraLogoPreference(settings[ROVALRA_LOGO_SETTING_NAME]);
        })
        .catch((error) => {
            console.warn('RoValra: Failed to load logo preference.', error);
            rovalraLogoPreferenceLoaded = true;
        })
        .finally(() => {
            rovalraLogoPreferencePromise = null;
        });

    return rovalraLogoPreferencePromise;
}

if (typeof document !== 'undefined') {
    document.addEventListener('rovalra:settingSaved', (event) => {
        if (event.detail?.name !== ROVALRA_LOGO_SETTING_NAME) return;
        setRovalraLogoPreference(event.detail.value);
    });
}

if (typeof chrome !== 'undefined' && chrome.storage?.onChanged) {
    chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName !== 'local') return;
        const change = changes[ROVALRA_LOGO_SETTING_NAME];
        if (!change) return;
        setRovalraLogoPreference(change.newValue);
    });
}

export function getAssets() {
    if (resolvedAssets) {
        loadRovalraLogoPreference();
        return resolvedAssets;
    }

    resolvedAssets = {};
    for (const key in assetManager.getAssets("UI")) {
        const path = getAssetPath("UI." + key);
        resolvedAssets[key] = resolveAssetPath(path);
    }
    updateResolvedDynamicAssets();
    loadRovalraLogoPreference();
    return resolvedAssets;
}
