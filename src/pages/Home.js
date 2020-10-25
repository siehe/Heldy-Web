import React from 'react';

import Board from '../components/Board/Board';
import Search from '../components/Board/Search/Search';

import styles from './Home.module.scss';

const HomePage = () => {
    return <div className={styles.rootWrapper}>
        <h1>Student board</h1>
        <div className={styles.contentWrapper}>
            <Search />
            <Board />
        </div>
    </div>;
}

export default HomePage;