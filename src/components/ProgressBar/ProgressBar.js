import React from 'react';

import styles from './ProgressBar.module.scss';

const ProgressBar = ({boardColumns}) => {
    const done = boardColumns[3].lists.length;
    const allTasksAmount = boardColumns.reduce((acc, curr) => {
        return acc + curr.lists.length;
    }, 0);
    const percent = Math.round((done/allTasksAmount) * 100);
    return <div className={styles.wrapper}>
            <div className={styles.text}
                  style={{ background: `linear-gradient(to right, ${percent ? '#76DBBD' : 'white'} ${percent}%, white ${100 - percent}%)`}}
            >{`${percent} / ${100}`}</div>
    </div>
};

export default ProgressBar;
