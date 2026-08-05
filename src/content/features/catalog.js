import { init as initItemSales } from './features/catalog/itemsales.js';
import { init as init40Method } from './features/catalog/40method.js';
import { init as initDependencies } from './features/catalog/depenencies.js';
import { init as initPriceFloor } from './features/catalog/pricefloor.js';
import { init as initCatalogBannerTest } from './features/catalog/bannerTest.js';
import { init as initParentItem } from './features/catalog/ParentItem.js';
import { init as initPurchasePrompt } from './features/catalog/purchasePrompt.js';
import { init as initItemTrading } from './features/catalog/ItemTrading.js';
import { init as initLastEquipped } from './features/catalog/lastEquipped.js';
import { init as initItemRender } from './features/catalog/ItemRender.js';
import { init as initFriendOwnership } from './features/catalog/friendOwnership.js';

const featureRoutes = [
{
    paths: ['/catalog', '/bundles'],
    features: [
        initDependencies,
        initItemSales,
        initPriceFloor,
        initCatalogBannerTest,
        initParentItem,
        initItemTrading,
        initLastEquipped,
        initItemRender,
        initFriendOwnership,
    ],
},
{
    paths: ['/looks'],  // Avatar pages
    features: [initItemRender],
},
{
    paths: ['/communities/'],  // Group Pages
    features: [initItemRender],
}
];

export default featureRoutes;
