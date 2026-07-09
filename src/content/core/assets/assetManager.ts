/// <reference types="chrome" />

import { AsyncLock } from "@the_glitch_master/jstools/async";

import fallbackJson from '../../../../public/Assets/data/RuntimeData/Assets.json';

type FormatValues = { [replaceString: string]: string | any }

class AssetManagerClass {
    private cache: Record<string, any>;
    private locks: Record<string, any>;
    private locksAccessLock?: AsyncLock;
    private assets: any;

    constructor() {
        this.cache = {};
        this.locks = {};
        this.assets = undefined;
    }

    async init() {
        this.locksAccessLock = await AsyncLock.new("assetManager:MainLock", false);

        const response = await fetch(
            chrome.runtime.getURL(`public/Assets/data/RuntimeData/Assets.json`),
        ); // Verified
        this.assets = await response.json();
    }

    private async getLock(id: string): Promise<AsyncLock> {
        const v = await this.locksAccessLock?.with(async () => {
            if (this.locks[id])
                return this.locks[id];

            const lock = await AsyncLock.new(id, false);  // Can be reacquired recursively by the same async context
            this.locks[id] = lock;
            return lock;
        });

        if (v instanceof Error) throw v;
        return v;
    }

    private get realAssets(): any {
        if (this.assets) {
            console.debug(`AssetManager: Retrieving assets from public/Assets.`);
            return this.assets;
        }

        console.debug(`Warning: AssetManager using fallback asset JSON.`);
        return fallbackJson;
    }

    async resolveAssetPath(name: string, fmt: FormatValues = {}): Promise<string> {
        const lock = await this.getLock(`asset:${name}`);
        const v = await lock.with(async () => {
            let value = this.resolveAssetPathSync(name, fmt);
            return value;
        });

        if (v instanceof Error) throw v;
        return v as any;
    }

    resolveAssetPathSync(name: string, fmt: FormatValues = {}): string {
        let value = this.realAssets;
        for (const str of name.split(".")) {
            value = value?.[str];
        }
        let value2: string = value ?? "";
        for (const [key, value] of Object.entries(fmt)) {
            value2 = value2.replace(key, String(value));
        }
        if (value2.startsWith("public/")) {
            value2 = chrome.runtime.getURL(value2);
        }
        return value2;
    }

    getAssets(query: string) {
        let value = this.realAssets;
        for (const str of query.split(".")) {
            value = value?.[str];
        }
        return value ?? {};
    }

    async readAssetFile(name: string, fmt: FormatValues = {}) {
        const lock = await this.getLock(`asset:${name}`);
        const value = await lock.with(async () => {
            let cachedValue;
            if (cachedValue = this.cache[`asset:${name}:fmt=${JSON.stringify(fmt)}`])
                return cachedValue.clone();

            const path: string = await this.resolveAssetPath(name, fmt);
            let value = await fetch(path);
            this.cache[`asset:${name}:fmt=${JSON.stringify(fmt)}`] = value;
            return value.clone();
        });

        if (value instanceof Error) throw value;
        return value;
    }
};

const AssetManager = new AssetManagerClass();
const InitPromise = AssetManager.init();

/**
 * Waits for the asset manager to finish initialising and returns it
 * @returns {Promise<AssetManagerClass>}
 */
export async function GetAssetManagerAsync(): Promise<AssetManagerClass> {
    await InitPromise;
    return AssetManager;
}

/**
 * Returns the asset manager, possibly uninitialised.
 * @returns {AssetManagerClass}
 */
export function GetAssetManager(): AssetManagerClass {
    return AssetManager;
}
