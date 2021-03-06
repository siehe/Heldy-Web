import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom';

import Board from '../components/Board/Board';
import Search from '../components/Board/Search/Search';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import TaskCreationForm from '../components/TaskCreationForm/TaskCreationForm';
import { usersRoles } from '../constants/usersRoles';

import styles from './Home.module.scss';

const HomePage = () => {
    const [displayCreationTask, setDisplayCreationTask] = useState(false);
    const [isRedirect, setIsRedirect] = useState(false);
    const boardColumns = useSelector((store) => store.boardColumns);

    const handleDisplayTaskCreationClick = () => {
        setDisplayCreationTask(!displayCreationTask);
    }

    const handleRedirectClick = () => {
        setIsRedirect(!isRedirect);
    }

    const isTeacher = (+localStorage.getItem('role')) === 1;

    return isRedirect ? <Redirect to={{
        pathname: '/student-registration'
    }}/> : <div className={styles.rootWrapper}>
        <h2>Board</h2>
        <div className={styles.contentWrapper}>
            <div className={styles.header}>
                <Search handleDisplayTaskCreationClick={handleDisplayTaskCreationClick}/>
                {displayCreationTask ? <TaskCreationForm handleClose={handleDisplayTaskCreationClick}/> : null }
                {isTeacher && (<button onClick={handleRedirectClick} className={styles.button}>Create new student</button>)}
            </div>
            <div className={styles.progressBarWrapper}>
                {boardColumns.length && <ProgressBar boardColumns={boardColumns}></ProgressBar>}
            </div>
            <Board />
        </div>
    </div>;
}

export default HomePage;