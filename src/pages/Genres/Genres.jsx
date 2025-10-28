// import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';

// import styles from './Genres.module.scss';

// const cx = classNames.bind(styles);
function Genres() {
    const { slug } = useParams();

    return <h1>Thể loại - {slug}</h1>;
}

export default Genres;
