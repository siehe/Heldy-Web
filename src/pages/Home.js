import React from 'react';

import Board from '../components/Board/Board';
import Search from '../components/Board/Search/Search';

import styles from './Home.module.scss';

const HomePage = () => {
    return <div className={styles.contentWrapper}>
        <h1>Student board</h1>
        <div className={styles.boardWrapper}>
            <Search />
            <Board />
        </div>
    </div>;
}

export default HomePage;