import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './DefaultLayout.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button/index-button';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [moveTop, setMoveTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setMoveTop(true);
            } else {
                setMoveTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMoveTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
            <Footer />
            {moveTop && (
                <div className={cx('move-top')} onClick={handleMoveTop}>
                    <Button square leftIcon={<FontAwesomeIcon icon={faArrowUp} />}></Button>
                </div>
            )}
        </div>
    );
}

export default DefaultLayout;
