import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Watch.module.scss';
import { detail } from '../../services/moviesServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Wacth() {
    const { slug } = useParams();
    const [movie, setMovie] = useState([]);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        movie.name ? (document.title = `Xem Phim ${movie.name}`) : (document.title = 'Xem Phim');
    }, [movie]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await detail(slug);
                setMovie(data.movie);
                setEpisodes(data.episodes);
            } catch (error) {
                console.error('Chet me API no loi cho nao roi:', error);
            }
        };

        fetchMovie();
    }, [slug]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('l-1')}>
                <Link to={`/phim/${slug}`}>
                    <FontAwesomeIcon icon={faCircleLeft} />
                </Link>
                <h2 className={cx('title')}>
                    Xem thông tin phim: <span>{movie.name}</span>
                </h2>
            </div>
            <div className={cx('video')}>
                <iframe
                    key={movie._id}
                    src={episodes?.[0]?.server_data?.[0]?.link_embed}
                    width="100%"
                    height="1000"
                    allowFullScreen
                    loading="lazy"
                    frameborder="0"
                    title={movie.name}
                    style={{ borderRadius: ' 1rem 1rem 0 0' }}
                ></iframe>
                <div className={cx('actions')}>
                    <div className={cx('action')}>
                        <FontAwesomeIcon icon={faHeart} />
                        <span>Yêu thích</span>
                    </div>
                    <div className={cx('action')}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span>Thêm vào</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wacth;
