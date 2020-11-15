import React, { useEffect, useState } from 'react';
import plusIcon from '../../icons/plus.png'
import CourseForm from '../../components/CourseForm/CourseForm';

import styles from './CreateCourse.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadTasksTypes } from '../../store/actions/loadTasksTypes';

const CreateCoursePage = () => {
    const dispatch = useDispatch();
    const tasksTypes = useSelector(store => store.types);
    const [ courseName, setCourseName ] = useState('');
    const [ createCourseForms, setCreateCourseForms ] = useState([]); 

    const handleClick = e => {
        setCreateCourseForms([...createCourseForms, 1]);
    };

    useEffect(() => {
        if(!tasksTypes) {
            dispatch(loadTasksTypes());
        }
    }, []);

    return <div className={styles.pageWrapper}>
        <h3>Create course</h3>
        <div className={styles.courseName}>
            <input placeholder="Enter course name" onChange={(e) => setCourseName(e.target.value)}/>
            <span>Course name</span>
        </div>
        { createCourseForms.map((el, i) => (<CourseForm key={i} index={i}></CourseForm>)) }
        <button onClick={handleClick}> <img src={plusIcon} alt="s"/> Add task </button>
    </div>
};

export default CreateCoursePage;
