import { cartoons } from '../../services/moviesServices';
import MovieList from '../../components/MovieList/MovieList';
function Cartoons() {
    return <MovieList title="Phim hoạt hình" fetchFunction={cartoons} type="cartoon" />;
}

export default Cartoons;
