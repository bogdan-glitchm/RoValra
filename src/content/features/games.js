import { init as initBotDetector } from './features/games/about/botDetector.js';
import { init as initQuickPlay } from './features/games/quickplay.js';
import { init as initHiddenBadges } from './features/games/hiddenBadges.js';
import { init as initBadgeLayoutToggle } from './features/games/badgeLayoutToggle.js';
import { init as initBadgeOwnership } from './features/games/badgeOwnership.js';
import { init as initServerList } from './features/games/serverlist/serverlist.js';
import { initRecentServers } from './features/games/serverlist/recentservers.js';
import { init as initRegionPlayButton } from './features/games/RegionPlayButton.js';
import { init as initSubplaces } from './features/games/tab/Subplaces.js';
import { initServerIdExtraction } from './core/games/servers/serverids.js';
import { init as initGameTrailers } from './features/games/thumbnails/gametrailers.js';
import { init as initGameBanner } from './core/ui/games/banner.js';
import { init as bannertest } from './features/games/banner.js';
import { init as quickOutfits } from './features/games/actions/quickOutfits.js';
import { init as initDevProductLoader } from './features/games/tab/DevProducts.js';
import { init as initDeveloperProductsSection } from './features/games/DeveloperProductsSection.js';
import { init as initDeveloperProductAutoBuy } from './features/games/developerProductAutoBuy.js';
import { init as initHeatmap } from './features/games/tab/updateHistory.js';
import { init as initTotalSpentGames } from './features/games/tab/totalSpentGames.js';
import { init as initEvents } from './features/games/about/events.js';
import { init as initUnderReviewPill } from './features/games/underReviewPill.js';

const featureRoutes = [
{
    paths: ['/games/'],  // Game Pages
    features: [
        initDeveloperProductsSection,
        initGameBanner,
        initServerIdExtraction,
        initBotDetector,
        initServerList,
        initRegionPlayButton,
        bannertest,
        initGameTrailers,
        quickOutfits,
        initRecentServers,
        initPrivateServerControls,
        initHeatmap,
        initPlusPrivateServerTooltip,
        initCatalogExplorer,
        initUnderReviewPill,
    ],
},
{
    paths: 
}
]
