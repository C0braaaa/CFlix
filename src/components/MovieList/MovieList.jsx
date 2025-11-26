import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faFilter } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

import styles from './MovieList.module.scss';

const cx = classNames.bind(styles);

function MovieList({ title, fetchFunction, type, slug }) {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [inputPage, setInputPage] = useState(page);
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        document.title = title;
    }, [title]);

    const decodeHTML = (html) => {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };

    const fetchMovies = useCallback(
        async (pageNum) => {
            setIsLoader(true);
            try {
                const data = await fetchFunction(pageNum, 32, slug);
                setMovies(data.items || []);
                setTotalPages(data.params?.pagination?.totalPages || data.totalPages || 1);
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                setIsLoader(false);
            }
        },
        [fetchFunction, slug],
    );

    useEffect(() => {
        fetchMovies(page);
        setInputPage(page);
    }, [page, fetchMovies]);

    const renderExtraInfo = (movie) => {
        // Tùy theo type mà hiển thị thông tin phụ khác nhau
        switch (type) {
            case 'single':
                return (
                    <>
                        <Tippy content="Chất lượng">
                            <span>{movie.quality}</span>
                        </Tippy>
                        <Tippy content="Năm phát hành">
                            <span>{movie.year}</span>
                        </Tippy>
                    </>
                );
            case 'series':
            case 'cartoon':
                return (
                    <>
                        <Tippy content="Tập hiện tại">
                            <span>{movie.episode_current.match(/\d+/)?.[0] || 'N/A'}</span>
                        </Tippy>
                        <Tippy content="Năm phát hành">
                            <span>{movie.year}</span>
                        </Tippy>
                    </>
                );
            case 'type':
                return (
                    <>
                        <Tippy content="Chất lượng">
                            <span>{movie.quality}</span>
                        </Tippy>
                        <Tippy content="Năm phát hành">
                            <span>{movie.year}</span>
                        </Tippy>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>{title}</h2>
            <div className={cx('filter')}>
                <div className={cx('filter-icon')}>
                    <FontAwesomeIcon icon={faFilter} />
                    <span>Bộ lọc</span>
                </div>
            </div>
            <div className={cx('content')}>
                {isLoader ? (
                    <div className={cx('loader')}></div>
                ) : (
                    <div className={cx('list-items')}>
                        {movies.map((movie) => (
                            <Link to={`/phim/${movie.slug}`} key={movie._id}>
                                <div className={cx('item')}>
                                    <div className={cx('poster')}>
                                        {movie.poster_url ? (
                                            <img
                                                src={`https://images.weserv.nl/?url=phimimg.com/${movie.poster_url}`}
                                                alt={movie.name}
                                            />
                                        ) : (
                                            <img src="assets/images/defaultimg.jpg" alt="not found" />
                                        )}
                                        <div className={cx('quality')}>{renderExtraInfo(movie)}</div>
                                    </div>
                                    <div className={cx('info')}>
                                        <h4 className={cx('name')}>{movie.name}</h4>
                                        <h4 className={cx('original-name')}>{decodeHTML(movie.origin_name)}</h4>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {/* Phân trang */}
                {!isLoader && (
                    <div className={cx('pagination')}>
                        <button className={cx('prev')} disabled={page <= 1} onClick={() => setPage(page - 1)}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <span className={cx('page')}>
                            Trang{' '}
                            <input
                                type="number"
                                min="1"
                                max={totalPages}
                                value={inputPage}
                                onChange={(e) => setInputPage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const newPage = Number(inputPage);
                                        if (newPage >= 1 && newPage <= totalPages) {
                                            setPage(newPage);
                                        } else {
                                            alert(`Vui lòng nhập trang từ 1 đến ${totalPages}`);
                                            setInputPage(page);
                                        }
                                    }
                                }}
                                className={cx('page-input')}
                            />{' '}
                            / {totalPages}
                        </span>
                        <button className={cx('next')} disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

MovieList.propTypes = {
    title: PropTypes.string.isRequired,
    fetchFunction: PropTypes.func.isRequired,
    slug: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default MovieList;
