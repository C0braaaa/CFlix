import classNames from 'classnames/bind';
import { useEffect } from 'react';

import styles from './MovieInfo.module.scss';

const cx = classNames.bind(styles);

function MovieInfo() {
    useEffect(() => {
        document.title = 'CFLIX | Thông tin phim';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h1>Thong tin phim bla bla</h1>
        </div>
    );
}

export default MovieInfo;
