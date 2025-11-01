import config from '../config/index-config';

// Pages
import Home from '../pages/Home/Home';
import SingleMovie from '../pages/SingleMovie/SingleMovie';
import Genres from '../pages/Genres/Genres';
import Nations from '../pages/Nations/Nations';
import UserPage from '../pages/UserPage/UserPage';
import FullTopics from '../pages/Topics/FullTopics';
import TopicsDetail from '../pages/Topics/TopicsDetail';
import Wacth from '../pages/Watch/Watch';

// public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.singleMovie, component: SingleMovie },
    { path: config.routes.category, component: Genres },
    { path: config.routes.nation, component: Nations },
    { path: config.routes.topics, component: FullTopics },
    { path: config.routes.topicsDetail, component: TopicsDetail },
    { path: config.routes.user, component: UserPage },
    { path: config.routes.watch, component: Wacth },
];

// private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
