import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'tippy.js/dist/tippy.css';

import Button from '../Button/index-button.jsx';
import styles from './Header.module.scss';
import { faBell, faDoorOpen, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import config from '../../config/index-config.js';
import { genres, nations, more, user } from './listDropdown.js';
import Dropdown from './Dropdown/Dropdown';
import Search from './Search/Search.jsx';

const cx = classNames.bind(styles);

function Header() {
    let currentUser = true;

    const [scroll, setScroll] = useState(false);
    const [showDropdown, setShowDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={cx('wrapper', { scroll: scroll })}>
            <Link to="/" className={cx('logo')}>
                <img src="/assets/images/logo.png" alt="logo" />
            </Link>

            {/* Search */}
            <Search />
            <div className={cx('el-group')}>
                <div className={cx('main-menu')}>
                    <div className={cx('menu-item')}>
                        <Link to={config.routes.singleMovie}>Phim Lẻ</Link>
                    </div>
                    <div className={cx('menu-item')}>
                        <Link to={config.routes.series}>Phim Bộ</Link>
                    </div>
                    <div className={cx('menu-item')}>
                        <Dropdown
                            id="1"
                            label="Thể Loại"
                            name="genres"
                            data={genres}
                            showDropdown={showDropdown}
                            setShowDropdown={setShowDropdown}
                        />
                    </div>
                    <div className={cx('menu-item')}>
                        <Dropdown
                            id="2"
                            label="Quốc Gia"
                            name="nations"
                            data={nations}
                            showDropdown={showDropdown}
                            setShowDropdown={setShowDropdown}
                        />
                    </div>
                    <div className={cx('menu-item')}>
                        <Dropdown
                            id="3"
                            label="Thêm"
                            name="more"
                            data={more}
                            showDropdown={showDropdown}
                            setShowDropdown={setShowDropdown}
                        />
                    </div>
                </div>
                {currentUser ? (
                    <div className={cx('app-download')}>
                        <div className={cx('app-download-icon')}>
                            <FontAwesomeIcon icon={faDoorOpen} />
                        </div>
                        <div className={cx('app-download-text')}>
                            <span>Chào mừng đến</span>
                            <strong>CFlix</strong>
                        </div>
                    </div>
                ) : (
                    <div className={cx('btn-2')}>
                        <Button primary leftIcon={<FontAwesomeIcon icon={faUserPlus} />}>
                            Đăng Kí
                        </Button>
                    </div>
                )}
                <div className={cx('main-user')}>
                    {currentUser ? (
                        <div className={cx('user-menu')}>
                            <div className={cx('notification')}>
                                <div className={cx('notification-icon')}>
                                    <FontAwesomeIcon icon={faBell} />
                                </div>
                            </div>
                            <Dropdown
                                name="user"
                                type="user"
                                data={user}
                                showDropdown={showDropdown}
                                setShowDropdown={setShowDropdown}
                                userInfo={{
                                    name: 'Cobra',
                                    avatar: '//assets.manutd.com/AssetPicker/images/0/0/22/86/1464036/8_Bruno_Fernandes1751376440402.webp',
                                }}
                            />
                        </div>
                    ) : (
                        <div className={cx('btn')}>
                            <Button primary leftIcon={<FontAwesomeIcon icon={faUser} />}>
                                Thành viên
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
