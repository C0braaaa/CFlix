import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';

import styles from './MovieInfo.module.scss';
import Button from '../../components/Button/index-button';
import { Link } from 'react-router-dom';
import { faHeart, faPaperPlane, faPlay, faPlus, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { detail } from '../../services/moviesServices';

const cx = classNames.bind(styles);

function MovieInfo() {
    const { slug } = useParams();

    const [movie, setMovie] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [input, setInput] = useState('');

    const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    useEffect(() => {
        movie.name ? (document.title = `Thông tin phim ${movie.name}`) : (document.title = 'Thông tin phim');
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
            <div className={cx('thumbnail')}>
                <img src={movie.thumb_url} alt={movie.name} />
            </div>
            <div className={cx('content')}>
                <div className={cx('left-side')}>
                    <div className={cx('poster')}>
                        <img src={movie.poster_url} alt={movie.name} />
                    </div>
                    <h2 className={cx('name')}>{movie.name}</h2>
                    <p className={cx('origin-name')}>{movie.origin_name}</p>
                    <div className={cx('tags')}>
                        <div className={cx('tag-tmdb')}>
                            <span>{movie?.tmdb?.vote_average ? movie?.tmdb?.vote_average.toFixed(1) : 'N/A'}</span>
                        </div>
                        <div className={cx('tag-quality')}>
                            <span>{movie.quality}</span>
                        </div>
                        <div className={cx('tag-year')}>
                            <span>{movie.year}</span>
                        </div>
                        <div className={cx('tag-duration')}>
                            <span>{movie.time}</span>
                        </div>
                    </div>
                    <div className={cx('types')}>
                        {movie?.category?.map((item, index) => (
                            <div className={cx('type')} key={index}>
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                    <div className={cx('description')}>
                        <h2 className={cx('title')}>Nội dung:</h2>
                        <p className={cx('desc')}>{decodeHTML(movie.content)}</p>
                    </div>
                    <p className={cx('country')}>
                        Quốc gia: <span>{movie?.country?.[0]?.name}</span>
                    </p>
                    <p className={cx('actor')}>
                        Diễn viên: <span>{movie?.actor?.join(', ')}</span>
                    </p>
                    <p className={cx('director')}>
                        Đạo diễn: <span>{movie?.director?.join(', ')}</span>
                    </p>
                </div>
                <div className={cx('right-side')}>
                    <div className={cx('l-1')}>
                        <Link to={`/xem-phim/${movie.slug}`} className={cx('btn-play')}>
                            <Button primary className={cx('btn')} leftIcon={<FontAwesomeIcon icon={faPlay} />}>
                                Xem ngay
                            </Button>
                        </Link>
                        <div className={cx('actions')}>
                            <div className={cx('action')}>
                                <FontAwesomeIcon icon={faHeart} />
                                <span className={cx('title')}>Yêu thích</span>
                            </div>
                            <div className={cx('action')}>
                                <FontAwesomeIcon icon={faPlus} />
                                <span className={cx('title')}>Thêm vào</span>
                            </div>
                            <div className={cx('action')}>
                                <FontAwesomeIcon icon={faThumbsUp} />
                                <span className={cx('title')}>Thích</span>
                            </div>
                            <div className={cx('action')}>
                                <FontAwesomeIcon icon={faThumbsDown} />
                                <span className={cx('title')}>Không thích</span>
                            </div>
                        </div>
                        <div className={cx('rating')}>
                            <span>10.0</span>
                        </div>
                    </div>
                    {movie?.episode_total > 1 && (
                        <div className={cx('l-2')}>
                            <div className={cx('episodes')}>
                                <h2 className={cx('total-episodes')}>Số tập: {movie.episode_total}</h2>
                                <h2 className={cx('status')}>Trạng thái: {movie.episode_current}</h2>
                            </div>
                            <div className={cx('items')}>
                                {episodes?.[0]?.server_data?.map((ep, index) => (
                                    <Link className={cx('item')} key={index}>
                                        {ep.name.split(' ')[1]}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className={cx('l-3')}>
                        <div className={cx('text')}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="21"
                                height="21"
                                viewBox="0 0 21 21"
                                fill="none"
                            >
                                <g clipPath="url(#clip0_281_3026)">
                                    <path
                                        d="M14.499 0.5H6.50109C3.19363 0.5 0.502686 3.19095 0.502686 6.4984V11.1638C0.502686 14.3596 3.01468 16.9796 6.16784 17.1532V19.9338C6.16784 20.2461 6.42244 20.5 6.73536 20.5C6.88498 20.5 7.02661 20.4407 7.13358 20.3337L7.75875 19.7085C9.40031 18.0666 11.5834 17.1622 13.9054 17.1622H14.499C17.8064 17.1622 20.4974 14.4713 20.4974 11.1638V6.4984C20.4974 3.19095 17.8064 0.5 14.499 0.5ZM6.16784 10.1641C5.4327 10.1641 4.83486 9.56625 4.83486 8.83111C4.83486 8.09597 5.4327 7.49813 6.16784 7.49813C6.90298 7.49813 7.50082 8.09597 7.50082 8.83111C7.50082 9.56625 6.90265 10.1641 6.16784 10.1641ZM10.5 10.1641C9.76488 10.1641 9.16704 9.56625 9.16704 8.83111C9.16704 8.09597 9.76488 7.49813 10.5 7.49813C11.2352 7.49813 11.833 8.09597 11.833 8.83111C11.833 9.56625 11.2348 10.1641 10.5 10.1641ZM14.8322 10.1641C14.0971 10.1641 13.4992 9.56625 13.4992 8.83111C13.4992 8.09597 14.0971 7.49813 14.8322 7.49813C15.5673 7.49813 16.1652 8.09597 16.1652 8.83111C16.1652 9.56625 15.567 10.1641 14.8322 10.1641Z"
                                        fill="currentColor"
                                    ></path>
                                </g>
                            </svg>
                            <h2>
                                {' '}
                                Bình luận <span>(0)</span>
                            </h2>
                        </div>
                        <div className={cx('comments')}>
                            <textarea
                                rows="4"
                                cols="3"
                                maxLength="1000"
                                value={input}
                                placeholder="Viết bình luận"
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                    }
                                }}
                            ></textarea>
                            <div className={cx('send')}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                                <span>Gửi</span>
                            </div>
                            <span className={cx('count')}>{input.length}/1000</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieInfo;
