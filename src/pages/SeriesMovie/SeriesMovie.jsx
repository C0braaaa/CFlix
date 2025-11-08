import { seriesMovie } from '../../services/moviesServices';
import MovieList from '../../components/MovieList/MovieList';
function SeriesMovie() {
    return <MovieList title="Phim Bộ" fetchFunction={seriesMovie} type="series" />;
}

export default SeriesMovie;
