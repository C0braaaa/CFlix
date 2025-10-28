import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-creative';
import { faCircleExclamation, faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { slidesInfo } from './list';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Swiper
                modules={[Pagination, Autoplay, EffectFade]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 50000, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
                resistance={true}
                resistanceRatio={0.85}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={1200}
                className={cx('slide')}
                onInit={(swiper) => {
                    // đảm bảo slide đầu có animation khi mount
                    const active = swiper.slides[swiper.activeIndex];
                    const image = active.querySelector(`.${cx('cover-image')}`);
                    const info = active.querySelector(`.${cx('slide-info')}`);
                    if (image) image.classList.add(cx('slideInRight'));
                    if (info) info.classList.add(cx('slideInLeft'));
                }}
                onSlideChangeTransitionStart={(swiper) => {
                    const prev = swiper.slides[swiper.previousIndex];
                    const next = swiper.slides[swiper.activeIndex];

                    // remove class trên slide trước (nếu còn)
                    if (prev) {
                        const pImg = prev.querySelector(`.${cx('cover-image')}`);
                        const pInfo = prev.querySelector(`.${cx('slide-info')}`);
                        if (pImg) pImg.classList.remove(cx('slideInRight'));
                        if (pInfo) pInfo.classList.remove(cx('slideInLeft'));
                    }

                    // reset + add class trên slide mới — chạy song song với fade
                    if (next) {
                        const nImg = next.querySelector(`.${cx('cover-image')}`);
                        const nInfo = next.querySelector(`.${cx('slide-info')}`);

                        if (nImg) {
                            nImg.classList.remove(cx('slideInRight'));
                            // requestAnimationFrame để đảm bảo browser nhận thay đổi và animate mượt
                            requestAnimationFrame(() => {
                                nImg.classList.add(cx('slideInRight'));
                            });
                        }
                        if (nInfo) {
                            nInfo.classList.remove(cx('slideInLeft'));
                            requestAnimationFrame(() => {
                                nInfo.classList.add(cx('slideInLeft'));
                            });
                        }
                    }
                }}
            >
                {slidesInfo.map((item, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div className={cx('slide')}>
                                <div className={cx('slide-elements')}>
                                    <div className={cx('cover-fade')}>
                                        <div className={cx('cover-image')}>
                                            <img className={cx('cover-img')} src={item.imgUrl} alt="cover" />
                                        </div>
                                    </div>
                                    <div className={cx('slide-info')}>
                                        <h2 className={cx('movie-title')}>{item.title}</h2>
                                        <p className={cx('movie-eng-title')}>{item.engTitle}</p>
                                        <div className={cx('movie-tags-1')}>
                                            <div className={cx('IMDb-tag')}>
                                                <span>{item.imdb}</span>
                                            </div>
                                            {item.quality && (
                                                <div className={cx('quality-tag')}>
                                                    <span>{item.quality}</span>
                                                </div>
                                            )}
                                            <div className={cx('tag-model')}>
                                                <span>{item.tagModel}</span>
                                            </div>
                                            {item.releaseInfo.map((info, index) => {
                                                return (
                                                    <div className={cx('tag-classic')} key={index}>
                                                        <span>{info}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className={cx('movie-tags-2')}>
                                            {item.topics.map((topic, index) => {
                                                return (
                                                    <div className={cx('tag-topic')} key={index}>
                                                        <span>{topic}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <p className={cx('movie-description')}>{item.description}</p>
                                        <div className={cx('movie-actions')}>
                                            <div className={cx('play')}>
                                                <Link to="/xem-phim/the-long-walk">
                                                    <FontAwesomeIcon className={cx('play-icon')} icon={faPlay} />
                                                </Link>
                                            </div>
                                            <div className={cx('group-actions')}>
                                                <div className={cx('action-item')}>
                                                    <FontAwesomeIcon icon={faHeart} />
                                                </div>
                                                <div className={cx('action-item')}>
                                                    <FontAwesomeIcon icon={faCircleExclamation} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div className={cx('main-content')}></div>
        </div>
    );
}

export default Home;
