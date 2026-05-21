import { describe, it, expect } from "vitest";
import { init } from "../src/content/features/sitewide/lessPlus";

describe("add", () => {
    it("adds two numbers", async () => {
        await chrome.storage.local.set({ "reducePlusAds": true, "removeAllPlusAdds": false });
        await init();
        expect(chrome.storage.local.get).toHaveBeenCalled();
    });
});
