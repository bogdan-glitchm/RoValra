import { vi } from "vitest";

globalThis.str = {};

declare global {
    let str: Record<string, any>;
    var chrome: any;
}

const c = {
    storage: {
        _listeners: new Array(),
        local: {
            get: vi.fn((data, callback) => {
                let result: Record<string, any> = {};
                if (data !== null) {
                    for (const [key, value] of Object.entries(data))
                        result[key] = str[key] ?? value;
                } else
                    result = str;
                if (callback)
                    callback(result);
                return Promise.resolve(result);
            }),
            set: vi.fn((data) => {
                for (const [key, value] of Object.entries(data))
                    str[key] = value;
                for (const l of c.storage._listeners)
                    l(data, c.storage.local);
                return new Promise((r) => r(true));
            }),
            remove: vi.fn((keys) => {
                for (const key of keys)
                    delete str[key];
                for (const l of c.storage._listeners)
                    l(keys.map((k) => ({k: undefined})), "local");
                return new Promise((r) => r(true));
            }),
        },
        onChanged: {
            addListener: (callback: (changes: any, area: string) => void) => {
                c.storage._listeners.push(callback);
            }
        }
    },
    runtime: {
        sendMessage: (...args: any[]) => {}  // not even gonna try to mock this lmfao
    }
};

vi.stubGlobal("chrome", c);
