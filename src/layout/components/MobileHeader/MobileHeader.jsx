import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MobileHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faMagnifyingGlass, faUser, faUserPlus, faX } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import Button from '../../../components/Button/index-button';
const cx = classNames.bind(styles);

function MobileHeader() {
    const [menuIcon, setMenuIcon] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('menu')}>
                <div
                    className={cx('menu__toogle')}
                    onClick={() => {
                        setMenuIcon((prev) => !prev);
                        setShowMenu((prev) => !prev);
                    }}
                >
                    {menuIcon ? (
                        <FontAwesomeIcon icon={faX} className={cx('icon--red')} />
                    ) : (
                        <FontAwesomeIcon icon={faBars} />
                    )}
                </div>
                <div className={cx('menu__list')}>
                    {showMenu && (
                        <div className={cx('container')}>
                            <div className={cx('btn')}>
                                <Button
                                    primary
                                    leftIcon={<FontAwesomeIcon icon={faUser} />}
                                    className={cx('btn__login')}
                                >
                                    Thành viên
                                </Button>
                                <Button
                                    primary
                                    leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                                    className={cx('btn__register')}
                                >
                                    Đăng kí
                                </Button>
                            </div>
                            <div className={cx('nav')}>
                                <ul className={cx('list')}>
                                    <li className={cx('item')}>
                                        <Link
                                            to="/phim-le"
                                            onClick={() => {
                                                setMenuIcon((prev) => !prev);
                                                setShowMenu((prev) => !prev);
                                            }}
                                        >
                                            Phim Lẻ
                                        </Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link
                                            to="/phim-bo"
                                            onClick={() => {
                                                setMenuIcon((prev) => !prev);
                                                setShowMenu((prev) => !prev);
                                            }}
                                        >
                                            Phim Bộ
                                        </Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link
                                            to="/hoat-hinh"
                                            onClick={() => {
                                                setMenuIcon((prev) => !prev);
                                                setShowMenu((prev) => !prev);
                                            }}
                                        >
                                            Hoạt Hình
                                        </Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link to="/">
                                            Thể Loại
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link to="/">
                                            Quốc Gia
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </Link>
                                    </li>
                                    <li className={cx('item')}>
                                        <Link to="/">
                                            Thêm
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Link to="/" className={cx('logo')}>
                <img src="/assets/images/logo.png" alt="logo" />
            </Link>
            <div className={cx('search')}>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </div>
        </div>
    );
}

export default MobileHeader;
