import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Watch.module.scss';

const cx = classNames.bind(styles);

function Wacth() {
    // const { slug } = useParams();

    useEffect(() => {
        document.title = 'CFLIX | Xem phim';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h1>Day la trang xem phim</h1>
        </div>
    );
}

export default Wacth;
