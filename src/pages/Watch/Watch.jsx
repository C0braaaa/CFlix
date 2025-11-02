import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Watch.module.scss';
import { slidesInfo } from '../Home/list';

const cx = classNames.bind(styles);

function Wacth() {
    const { slug } = useParams();

    const movie = slidesInfo.find((item) => item.to.endsWith(slug));

    useEffect(() => {
        if (movie) {
            document.title = `Xem Phim ${movie.title} | ${movie.engTitle}`;
        } else {
            document.title = 'CFLIX | Xem phim';
        }
    }, [movie]);

    return (
        <div className={cx('wrapper')}>
            {movie ? (
                <div className={cx('player-container')}>
                    <h1 className={cx('movie-title')}>{movie.title}</h1>
                    <div className={cx('video-wrapper')}>
                        <iframe
                            src="https://player.phimapi.com/player/?url=https://s6.kkphimplayer6.com/20250828/c0xkSuds/index.m3u8"
                            title={movie.title}
                            allowFullScreen
                            frameBorder="0"
                            className={cx('video-player')}
                        ></iframe>
                    </div>
                </div>
            ) : (
                <p>Không tìm thấy phim.</p>
            )}
        </div>
    );
}

export default Wacth;
