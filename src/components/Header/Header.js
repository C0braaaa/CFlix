import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Button from '../Button/index-button.js';
import styles from './Header.module.scss';
import {
    faBell,
    faCaretDown,
    faCircleXmark,
    faMagnifyingGlass,
    faRightFromBracket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import config from '../../config/index-config.js';
import { genres, nations, more, user } from './listDropdown.js';

const cx = classNames.bind(styles);

function Header() {
    let currentUser = true;

    const [input, setInput] = useState('');
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

    const inputRef = useRef();

    const handleDeleteText = () => {
        setInput('');
        inputRef.current.focus();
    };

    const handleHideDropdown = () => {
        setShowDropdown(null);
    };

    const renderTippyGenres = () => (
        <Tippy
            interactive
            offset={[0, 15]}
            onClickOutside={handleHideDropdown}
            visible={showDropdown === 'genres'}
            placement="bottom-start"
            render={(attrs) => (
                <div className={cx('dropdown')} tabIndex="-1" {...attrs}>
                    <div className={cx('dropdown-list')}>
                        {genres.map((genre, index) => (
                            <Link to={genre.to} className={cx('dropdown-item')} key={index}>
                                <span>{genre.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        >
            <div
                className={cx('menu-item-toggle')}
                onClick={() => setShowDropdown(showDropdown === 'genres' ? null : 'genres')}
            >
                Thể Loại
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
        </Tippy>
    );

    const renderTippyNations = () => (
        <Tippy
            interactive
            offset={[0, 15]}
            onClickOutside={handleHideDropdown}
            visible={showDropdown === 'nations'}
            placement="bottom-start"
            render={(attrs) => (
                <div className={cx('dropdown-2')} tabIndex="-1" {...attrs}>
                    <div className={cx('dropdown-list-2')}>
                        {nations.map((nation, index) => (
                            <Link to={nation.to} className={cx('dropdown-item-2')} key={index}>
                                <span>{nation.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        >
            <div
                className={cx('menu-item-toggle')}
                onClick={() => setShowDropdown(showDropdown === 'nations' ? null : 'nations')}
            >
                Quốc Gia
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
        </Tippy>
    );

    const renderTippyMore = () => (
        <Tippy
            interactive
            offset={[0, 15]}
            onClickOutside={handleHideDropdown}
            visible={showDropdown === 'more'}
            placement="bottom-start"
            render={(attrs) => (
                <div className={cx('dropdown-3')} tabIndex="-1" {...attrs}>
                    <div className={cx('dropdown-list-3')}>
                        {more.map((value, index) => (
                            <Link to={value.to} className={cx('dropdown-item-3')} key={index}>
                                <span>{value.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        >
            <div
                className={cx('menu-item-toggle')}
                onClick={() => setShowDropdown(showDropdown === 'more' ? null : 'more')}
            >
                Thêm
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
        </Tippy>
    );

    return (
        <div className={cx('wrapper', { scroll: scroll })}>
            <Link to="/" className={cx('logo')}>
                <img src="/assets/images/logo.png" alt="logo" />
            </Link>

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
            <div className={cx('el-group')}>
                <div className={cx('main-menu')}>
                    <div className={cx('menu-item')}>
                        <Link to={config.routes.singleMovie}>Phim Lẻ</Link>
                    </div>
                    <div className={cx('menu-item')}>
                        <Link to={config.routes.series}>Phim Bộ</Link>
                    </div>
                    <div className={cx('menu-item')}>
                        {showDropdown && renderTippyGenres()}
                        {!showDropdown && (
                            <div className={cx('menu-item-toggle')} onClick={() => setShowDropdown('genres')}>
                                Thể Loại
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                        )}
                    </div>
                    <div className={cx('menu-item')}>
                        {showDropdown && renderTippyNations()}
                        {!showDropdown && (
                            <div className={cx('menu-item-toggle')} onClick={() => setShowDropdown('nations')}>
                                Quốc Gia
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                        )}
                    </div>
                    <div className={cx('menu-item')}>
                        {showDropdown && renderTippyMore()}
                        {!showDropdown && (
                            <div className={cx('menu-item-toggle')} onClick={() => setShowDropdown('more')}>
                                Thêm
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                        )}
                    </div>
                </div>
                <div className={cx('app-download')}>
                    <div className={cx('app-download-icon')}>
                        <svg
                            id="Pc"
                            width="36"
                            height="36"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.9998 16.8992C11.1655 16.8992 11.2998 16.7649 11.2998 16.5992V11.5982C11.2998 9.28322 13.1838 7.39922 15.4998 7.39922H18.7998C18.9238 7.39922 19.0446 7.41106 19.1616 7.43327C19.3745 7.47368 19.5998 7.32682 19.5998 7.11012V6.69922C19.5998 6.67022 19.5968 6.64022 19.5918 6.61222C19.2488 4.66722 17.4468 3.19922 15.4008 3.19922H6.79982C4.42882 3.19922 2.49982 5.12822 2.49982 7.49922V12.5982C2.49982 14.9692 4.42882 16.8992 6.79982 16.8992H8.24282L7.86182 19.2492H5.85982C5.44582 19.2492 5.10982 19.5852 5.10982 19.9992C5.10982 20.4132 5.44582 20.7492 5.85982 20.7492H10.7598C11.1738 20.7492 11.5098 20.4132 11.5098 19.9992C11.5098 19.5852 11.1738 19.2492 10.7598 19.2492H9.38082L9.76182 16.8992H10.9998Z"
                                fill="#FFD875"
                            ></path>
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.1912 18.4564C16.7712 18.4564 16.4302 18.1154 16.4302 17.6954C16.4302 17.2754 16.7712 16.9344 17.1912 16.9344C17.6112 16.9344 17.9522 17.2754 17.9522 17.6954C17.9522 18.1154 17.6112 18.4564 17.1912 18.4564ZM18.8002 8.90039H15.5002C14.0362 8.90039 12.8002 10.1364 12.8002 11.5994V18.0994C12.8002 19.5884 14.0112 20.7994 15.5002 20.7994H18.8002C20.2892 20.7994 21.5002 19.5884 21.5002 18.0994V11.5994C21.5002 10.1364 20.2642 8.90039 18.8002 8.90039Z"
                                fill="#ffffff"
                            ></path>
                        </svg>
                    </div>
                    <div className={cx('app-download-text')}>
                        <span>Tải ứng dụng</span>
                        <strong>CFlix</strong>
                    </div>
                </div>
                <div className={cx('main-user')}>
                    {currentUser ? (
                        <div className={cx('user-menu')}>
                            <div className={cx('notification')}>
                                <div className={cx('notification-icon')}>
                                    <FontAwesomeIcon icon={faBell} />
                                </div>
                            </div>
                            {showDropdown && (
                                <Tippy
                                    interactive
                                    offset={[-15, 0]}
                                    onClickOutside={handleHideDropdown}
                                    visible={showDropdown === 'user'}
                                    placement="bottom-end"
                                    render={(attrs) => (
                                        <div className={cx('user-dropdown')} tabIndex="-1" {...attrs}>
                                            <span className={cx('username')}>Cobra</span>
                                            <hr />
                                            <div className={cx('user-menu-2')}>
                                                {user.map((value, index) => (
                                                    <Link to={value.to} className={cx('user-menu-item')} key={index}>
                                                        <FontAwesomeIcon icon={value.icon} />
                                                        <span>{value.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                            <hr />
                                            <div className={cx('user-logout')}>
                                                <FontAwesomeIcon icon={faRightFromBracket} />
                                                <span>Thoát</span>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <div
                                        className={cx('user')}
                                        onClick={() => setShowDropdown(showDropdown === 'user' ? null : 'user')}
                                    >
                                        <div className={cx('avatar')}>
                                            <img
                                                className={cx('avatar-img')}
                                                src="//assets.manutd.com/AssetPicker/images/0/0/22/86/1464036/8_Bruno_Fernandes1751376440402.webp"
                                                alt="avatar"
                                            />
                                        </div>
                                        <div className={cx('arrow-down')}>
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        </div>
                                    </div>
                                </Tippy>
                            )}
                            {!showDropdown && (
                                <div className={cx('user')} onClick={() => setShowDropdown('user')}>
                                    <div className={cx('avatar')}>
                                        <img
                                            className={cx('avatar-img')}
                                            src="//assets.manutd.com/AssetPicker/images/0/0/22/86/1464036/8_Bruno_Fernandes1751376440402.webp"
                                            alt="avatar"
                                        />
                                    </div>
                                    <div className={cx('arrow-down')}>
                                        <FontAwesomeIcon icon={faCaretDown} />
                                    </div>
                                </div>
                            )}
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
