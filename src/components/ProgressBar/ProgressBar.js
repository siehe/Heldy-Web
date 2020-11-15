import React from 'react';

import styles from './ProgressBar.module.scss';

const ProgressBar = ({boardColumns}) => {
    console.log(boardColumns);
    const done = boardColumns[3].lists.length;
    const allTasksAmount = boardColumns.reduce((acc, curr) => {
        return acc + curr.lists.length;
    }, 0);

    return <div className={styles.wrapper}>
        <div>
            <span style={{ width: Math.round((done/allTasksAmount) * 100) }}></span>
            <span className={styles.text}>{ `${Math.round((done/allTasksAmount) * 100)} / ${100}` }</span>
        </div>
    </div>
};

export default ProgressBar;
