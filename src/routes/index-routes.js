import config from '../config/index-config';

// Pages
import Home from '../pages/Home/Home';
import SingleMovie from '../pages/SingleMovie/SingleMovie';
import Genres from '../pages/Genres/Genres';
import Nations from '../pages/Nations/Nations';
import UserPage from '../pages/UserPage/UserPage';

// public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.singleMovie, component: SingleMovie },
    { path: config.routes.category, component: Genres },
    { path: config.routes.nation, component: Nations },
    { path: config.routes.user, component: UserPage },
];

// private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
