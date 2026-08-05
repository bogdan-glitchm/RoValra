import { init as initAvatarFilters } from './features/avatar/filters.js';
import { init as initR6Warning } from './features/avatar/R6Warning.js';
import { init as initAvatarRotator } from './features/avatar/avatarRotator.js';
import { init as initMultiEquip } from './features/avatar/multiEquip.js';

const featureRoutes = [
{
    paths: ['/my/avatar'],
    features: [
        initAvatarFilters,
        initR6Warning,
        initAvatarRotator,
        initMultiEquip,
    ],
}
];

export default featureRoutes;
