import { singleMovie } from '../../services/moviesServices';
import MovieList from '../../components/MovieList/MovieList';
function SingleMovie() {
    return <MovieList title="Phim Lẻ" fetchFunction={singleMovie} type="single" />;
}

export default SingleMovie;
