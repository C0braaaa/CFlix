import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search() {
    const [input, setInput] = useState('');

    const inputRef = useRef();

    const handleDeleteText = () => {
        setInput('');
        inputRef.current.focus();
    };
    return (
        <div className={cx('search')}>
            <div className={cx('search-elements')}>
                <input
                    ref={inputRef}
                    value={input}
                    className={cx('search-input')}
                    type="text"
                    placeholder="Tìm kiếm phim, diễn viên"
                    onChange={(e) => setInput(e.target.value)}
                />
                <div className={cx('search-icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div id="remove-text" className={cx('remove-icon')} onClick={handleDeleteText}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </div>
            </div>
        </div>
    );
}

export default Search;
