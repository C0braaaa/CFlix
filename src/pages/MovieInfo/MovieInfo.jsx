import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { slidesInfo } from '../Home/list';
import styles from './MovieInfo.module.scss';

const cx = classNames.bind(styles);

function MovieInfo() {
    const { slug } = useParams();

    const movie = slidesInfo.find((item) => item.to.endsWith(slug));

    useEffect(() => {
        if (movie) {
            document.title = `Phim ${movie.title} | ${movie.engTitle}`;
        } else {
            document.title = 'CFLIX | Thông tin phim';
        }
    }, [movie]);

    return <div className={cx('wrapper')}></div>;
}

export default MovieInfo;
