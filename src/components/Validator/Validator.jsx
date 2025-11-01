import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Validator.module.scss';

const cx = classNames.bind(styles);

function ValidatorForm({ name = '', placeholder = '', type = 'text', rules = '', onSubmit }) {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const typingTimeoutRef = useRef(null); // dùng để debounce

    // rule definitions
    const ruleSet = {
        required: (val, msg) => (val ? undefined : msg || 'Bạn phải nhập trường này!'),
        email: (val, msg) => {
            const regex =
                /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))/;
            return regex.test(val) ? undefined : msg || 'Email không hợp lệ, vui lòng nhập lại!';
        },
        min: (min) => (val, msg) => val.length >= min ? undefined : msg || `Mật khẩu phải có ít nhất ${min} ký tự`,
    };

    // validate theo rules
    const handleValidate = (val) => {
        if (!rules) return '';
        const ruleList = rules.split('|');
        for (let rule of ruleList) {
            let ruleInfo;
            let hasValue = rule.includes(':');
            if (hasValue) {
                ruleInfo = rule.split(':');
                rule = ruleInfo[0];
            }

            const baseFn = ruleSet[rule];
            if (!baseFn) continue; // ❗ tránh undefined function

            // nếu rule có tham số (vd: min:6) thì gọi hàm cha để lấy hàm con
            const checkFn = hasValue ? baseFn(ruleInfo[1]) : baseFn;

            // đảm bảo checkFn là hàm thật
            if (typeof checkFn !== 'function') continue;

            const msg = checkFn(val);
            if (msg) return msg;
        }
        return '';
    };

    // Khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        const errMsg = handleValidate(value);
        if (errMsg) {
            setError(errMsg);
        } else {
            setError('');
            if (typeof onSubmit === 'function') {
                onSubmit({ [name]: value });
            }
        }
    };

    // Khi người dùng gõ
    const handleChange = (e) => {
        const val = e.target.value;
        setValue(val);
        setError('');

        // debounce validate khi dừng gõ 0.5s
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            const errMsg = handleValidate(val);
            setError(errMsg);
        }, 500);
    };

    // Khi blur input
    const handleBlur = () => {
        const errMsg = handleValidate(value);
        setError(errMsg);
    };

    return (
        <div className={cx('main')}>
            <form className={cx('form')} onSubmit={handleSubmit}>
                <div className={cx('form-group', { invalid: error })}>
                    <input
                        id={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        className={cx('form-control')}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <span className={cx('form-message')}>{error}</span>
                </div>
            </form>
        </div>
    );
}

export default ValidatorForm;
