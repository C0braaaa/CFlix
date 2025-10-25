import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return <h1 style={{ height: 1000, marginTop: 100 }}>Home</h1>;
}

export default Home;
