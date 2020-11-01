import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';

import Board from '../components/Board/Board';
import Search from '../components/Board/Search/Search';
import TaskCreationForm from '../components/TaskCreationForm/TaskCreationForm';

import styles from './Home.module.scss';

const HomePage = () => {
    const [displayCreationTask, setDisplayCreationTask] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);

    const handleDisplayTaskCreationClick = () => {
        setDisplayCreationTask(!displayCreationTask);
    }

    const handleRedirectClick = () => {
        setIsRedirect(!isRedirect);
    }

    return isRedirect ? <Redirect to={{
        pathname: '/registration'
    }}/> : <div className={styles.rootWrapper}>
        <h1>Student board</h1>
        <div className={styles.contentWrapper}>
            <div className={styles.header}>
                <Search handleDisplayTaskCreationClick={handleDisplayTaskCreationClick}/>
                {displayCreationTask ? <TaskCreationForm handleClose={handleDisplayTaskCreationClick}/> : null }
                <button onClick={handleRedirectClick} className={styles.button}>Create new student</button>
            </div>
            <Board />
        </div>
    </div>;
}

export default HomePage;