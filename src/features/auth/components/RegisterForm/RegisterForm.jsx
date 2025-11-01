import classNames from 'classnames/bind';

import ValidatorForm from '../../../../components/Validator/Validator';
import { useAuth } from '../../context/AuthContext';
import styles from './RegisterForm.module.scss';
import Button from '../../../../components/Button/index-button';

const cx = classNames.bind(styles);

function RegisterForm() {
    const { closeModal } = useAuth();

    return (
        <div className={cx('wrapper', 'register-modal')}>
            <div className={cx('modal-content')}>
                <div className={cx('close-modal')} onClick={closeModal}>
                    &times;
                </div>
                <div className={cx('register-form')}>
                    <h3 className={cx('title')}>Đăng kí</h3>
                    <p className={cx('switch-top-regiter')}>
                        Bạn đã có tài khoản, <span className={cx('register')}>đăng nhập ngay</span>
                    </p>
                    <ValidatorForm name="username" placeholder="Tên hiên thị" type="text" rules="required" />
                    <ValidatorForm name="email" placeholder="Email" type="text" rules="required|email" />
                    <ValidatorForm name="password" placeholder="Mật khẩu" type="text" rules="required|min:6" />
                    <ValidatorForm name="password" placeholder="Xác nhận mật khẩu" type="text" rules="required|min:6" />

                    <div className={cx('btn-login')}>
                        <Button primary className={cx('btn')}>
                            Đăng Ký
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
