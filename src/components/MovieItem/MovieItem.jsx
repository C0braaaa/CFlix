import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './MovieItem.module.scss';

const cx = classNames.bind(styles);
function MovieItem({ data }) {
    return (
        <Link to="/tim-kiem" className={cx('wrapper')}>
            <img
                className={cx('poster')}
                src={`https://images.weserv.nl/?url=phimimg.com/${data.poster_url}`}
                alt={data.name}
                onError={(e) => (e.target.src = 'assets/images/defaultimg.jpg ')}
            />
            <div className={cx('info')}>
                <h4 className={cx('movie-name')}>
                    <span>{data.name}</span>
                </h4>
                <span className={cx('original-name')}>{data.origin_name}</span>
                <span className={cx('more-info')}>
                    {data.year} • {data.time}
                </span>
            </div>
        </Link>
    );
}

MovieItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default MovieItem;
