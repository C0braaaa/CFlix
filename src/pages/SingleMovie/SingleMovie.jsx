import { useEffect } from 'react';

function SingleMovie() {
    useEffect(() => {
        document.title = 'Phim Lẻ';
    }, []);

    return <h1>Phim Lẻ</h1>;
}

export default SingleMovie;
