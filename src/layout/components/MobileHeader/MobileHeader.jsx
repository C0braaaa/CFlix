import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './MobileHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faUser, faUserPlus, faX } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import Button from '../../../components/Button/index-button';
import Dropdown from '../../../components/Dropdown/Dropdown';
import { genres, nations, more } from '../Header/listDropdown';
import Search from '../Search/Search';
const cx = classNames.bind(styles);

function MobileHeader() {
    const [menuIcon, setMenuIcon] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(true);
    const [showDropdown, setShowDropdown] = useState(null);

    const closeMenu = () => {
        setMenuIcon(false);
        setShowMenu(false);
        setShowDropdown(null);
    };

    return (
        <div className={cx('wrapper')}>
            {showSearch ? (
                <>
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
                                                <Dropdown
                                                    label="Thể Loại"
                                                    name="genres"
                                                    data={genres}
                                                    showDropdown={showDropdown}
                                                    setShowDropdown={setShowDropdown}
                                                    columns={3}
                                                    closeMenu={closeMenu}
                                                    width="38rem"
                                                    height="30rem"
                                                />
                                            </li>
                                            <li className={cx('item')}>
                                                <Dropdown
                                                    label="Quốc Gia"
                                                    name="nations"
                                                    data={nations}
                                                    showDropdown={showDropdown}
                                                    setShowDropdown={setShowDropdown}
                                                    columns={3}
                                                    closeMenu={closeMenu}
                                                    width="38rem"
                                                    height="38rem"
                                                />
                                            </li>
                                            <li className={cx('item')}>
                                                <Dropdown
                                                    label="Thêm"
                                                    name="more"
                                                    data={more}
                                                    showDropdown={showDropdown}
                                                    setShowDropdown={setShowDropdown}
                                                    columns={1}
                                                    closeMenu={closeMenu}
                                                    width="16rem"
                                                    height="15rem"
                                                />
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
                </>
            ) : (
                <Search />
            )}
            <div className={cx('search')}>
                <div className={cx('icon')} onClick={() => setShowSearch((prev) => !prev)}>
                    {showSearch ? (
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    ) : (
                        <FontAwesomeIcon icon={faX} style={{ color: 'red' }} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default MobileHeader;
