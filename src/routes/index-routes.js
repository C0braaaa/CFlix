import config from '../config/index-config';

// Pages
import Home from '../pages/Home/Home';
import SingleMovie from '../pages/SingleMovie/SingleMovie';

// public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.singleMovie, component: SingleMovie },
];

// private routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
