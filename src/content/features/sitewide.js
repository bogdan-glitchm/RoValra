import { init as initOnboarding } from './features/onboarding/onboarding.js';
import { init as initWhatAmIJoining } from './features/games/revertlogo.js';
import { init as initEasterEggLinks } from './features/sitewide/easterEggs/links.js';
import { init as initCssFixes } from './features/sitewide/cssfixes.js';
import { init as initServerListener } from './features/games/serverlistener.js';
import { init as initBetaPrograms } from './features/navigation/betaprograms.js';
import { init as initVideoTest } from './features/developer/videotest.js';
import { init as initStreamerMode } from './features/sitewide/streamermode.js';
import { init as initMarkDownTest } from './features/developer/markdowntest.js';
import { init as initTests } from './features/developer/tests.js';
import { init as initApiDocs } from './features/developer/apiDocs.js';
import { init as initModeration } from './features/moderation/moderation.js';
import { init as initBirthdayTracker } from './core/utils/trackers/birthday.js';
import { init as initServerTracker } from './core/utils/trackers/servers.js';
import { initFriendsListTracking } from './core/utils/trackers/friendslist.js';
import { initTransactionsTracking } from './core/utils/trackers/transactions.js';
import { initBadgesTracking } from './core/utils/trackers/badges.js';
import { initAvatarInventoryTracking } from './core/utils/trackers/avatarInventory.js';
import { initUserCurrencyTracking } from './core/utils/trackers/currency.js';
import { init as initClientChannelTracker } from './core/utils/trackers/channels.js';
import { init as initPrivateGames } from './features/games/privateGames.js';
import { init as initGamePassViewer } from './features/games/gamePassViewer.js';
import { init as initQoLToggles } from './features/navigation/QoLToggles.js';
import { init as initCopyId } from './features/sitewide/copyid.js';
import { init as initViewIds } from './features/sitewide/viewid.js';
import { init as initQuickSearch } from './features/navigation/search/quicksearch.js';
import { init as initRenderTest } from './features/developer/rendertest.js';
import { init as initGroupFunds } from './features/navigation/groupfunds.js';
import { init as initUrlTracker } from './core/utils/trackers/urlTracker.js';
import { init as initCustomFont } from './features/sitewide/customFont.js';
import { init as initTransactionsLink } from './features/navigation/transactionslink.js';
import { init as initDocsLink } from './features/navigation/docslink.js';
import { initializeModernIcons as initModernIcons } from './features/sitewide/modernIcons.js';
import { init as initLoginBanner } from './features/scamprevention/loginBanner.js';
import { init as initLessPlus } from './features/sitewide/lessPlus.js';
import { init as initKidsTheme } from './features/sitewide/kidsTheme.js';
import { init as initKidsThemeText } from './features/sitewide/kidsThemeText.js';
import { init as initCustomRobloxBanner } from './features/sitewide/customRobloxBanner.js';
import { init as initSidebarCollapse } from './features/sitewide/sidebarCollapse.js';
import { init as initSidebarLayout } from './features/sitewide/sidebarLayout.js';
import { init as initTopbarLayout } from './features/sitewide/topbarLayout.js';
import { init as initWideTilePlayerCounts } from './features/sitewide/wideTilePlayerCounts.js';
import { init as initPaymentMethodBonusItems } from './features/paymentmethods/bonusItems.js';
import { init as initBackgroundImage } from './features/sitewide/backgroundImage.js';
import { init as initFreeRobloxPlusThemes } from './features/sitewide/freeRobloxPlusThemes.js';
import { initNotificationCenter as initReceiveRobuxNotificationCenter } from './features/plus/sendRobux.js';

const featureRoutes = [
{
    paths: ['*'],
    once: true,
    features: [
        initSettingsPage,
        initQuickPlay,
        initEasterEggLinks,
        initCssFixes,
        initWhatAmIJoining,
        initServerListener,
        initOnboarding,
        initVideoTest,
        initStreamerMode,
        initMarkDownTest,
        initTests,
        initBirthdayTracker,
        initServerTracker,
        initFriendsListTracking,
        initTransactionsTracking,
        initBadgesTracking,
        initAvatarInventoryTracking,
        initUserCurrencyTracking,
        initClientChannelTracker,
        initQoLToggles,
        initCopyId,
        initViewIds,
        initBetaPrograms,
        initPreviousPrice,
        initQuickSearch,
        initRenderTest,
        initPrivateGames,
        initBannedUsers,
        initGroupFunds,
        initTransactionsLink,
        initDocsLink,
        initStatus,
        initCustomFont,
        initRobuxIcons,
        initProfileBackground,
        initAvatarBorder,
        initDisplayNameGradient,
        initPurchasePromptItemId,
        initCurrentlyPlayingSubplace,
        initUrlTracker,
        initModernIcons,
        initLessPlus,
        initKidsTheme,
        initKidsThemeText,
        initCustomRobloxBanner,
        initSidebarCollapse,
        initSidebarLayout,
        initTopbarLayout,
        initWideTilePlayerCounts,
        initBackgroundImage,
        initFreeRobloxPlusThemes,
        initCustomThemeEditor,
        initReceiveRobuxNotificationCenter,
    ]
}
];

export default featureRoutes;
