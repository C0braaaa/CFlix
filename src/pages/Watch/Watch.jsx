import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './Watch.module.scss';
import { detail } from '../../services/moviesServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft, faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Wacth() {
    const { slug, episode } = useParams();
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

    const currentEpisode =
        episodes?.[0]?.server_data?.find((ep) => ep.slug === episode) || episodes?.[0]?.server_data?.[0];

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
                    src={currentEpisode?.link_embed}
                    width="100%"
                    height="1000"
                    allowFullScreen
                    loading="lazy"
                    frameBorder="0"
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
            {movie?.episode_total > 1 && (
                <>
                    <h2 className={cx('title-2')}>Danh sách tập</h2>
                    <div className={cx('episodes')}>
                        {episodes?.[0]?.server_data?.map((ep, index) => (
                            <Link
                                to={`/xem-phim/${slug}/${ep.slug}`}
                                className={cx('episode', { active: ep.slug === episode })}
                                key={index}
                            >
                                {ep.name.split(' ')[1]}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Wacth;
