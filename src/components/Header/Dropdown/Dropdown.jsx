import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';

const cx = classNames.bind(styles);

function Dropdown({ id, label, name, data, type = 'menu', showDropdown, setShowDropdown, userInfo }) {
    const isVisible = showDropdown === name;

    const handleToggle = () => {
        setShowDropdown(isVisible ? null : name);
    };

    const handleHide = () => {
        setShowDropdown(null);
    };

    if (type === 'user') {
        return (
            <>
                {isVisible ? (
                    <Tippy
                        interactive
                        offset={[-15, 0]}
                        onClickOutside={handleHide}
                        visible={isVisible}
                        placement="bottom-end"
                        render={(attrs) => (
                            <div className={cx('user-dropdown')} tabIndex="-1" {...attrs}>
                                <span className={cx('username')}>{userInfo?.name}</span>
                                <hr />
                                <div className={cx('user-menu-2')}>
                                    {data.map((value, index) => (
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
                        <div className={cx('user')} onClick={handleToggle}>
                            <div className={cx('avatar')}>
                                <img src={userInfo?.avatar} alt="avatar" className={cx('avatar-img')} />
                            </div>
                            <div className={cx('arrow-down')}>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                        </div>
                    </Tippy>
                ) : (
                    <div className={cx('user')} onClick={handleToggle}>
                        <div className={cx('avatar')}>
                            <img src={userInfo?.avatar} alt="avatar" className={cx('avatar-img')} />
                        </div>
                        <div className={cx('arrow-down')}>
                            <FontAwesomeIcon icon={faCaretDown} />
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <>
            {isVisible ? (
                <Tippy
                    interactive
                    visible={isVisible}
                    onClickOutside={() => setShowDropdown(null)}
                    placement="bottom-start"
                    render={(attrs) => (
                        <div className={cx('dropdown')} tabIndex="-1" {...attrs}>
                            <div className={cx('dropdown-list-' + id)}>
                                {data.map((item, i) => (
                                    <Link key={i} to={item.to} className={cx('dropdown-item-' + id)}>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                >
                    <div className={cx('menu-item-toggle')} onClick={handleToggle}>
                        {label}
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                </Tippy>
            ) : (
                <div className={cx('menu-item-toggle')} onClick={handleToggle}>
                    {label}
                    <FontAwesomeIcon icon={faCaretDown} />
                </div>
            )}
        </>
    );
}

export default Dropdown;
