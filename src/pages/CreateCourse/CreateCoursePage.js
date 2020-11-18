import React, { useEffect, useState } from 'react';
import plusIcon from '../../icons/plus.png'
import CourseForm from '../../components/CourseForm/CourseForm';

import styles from './CreateCourse.module.scss';
import { useDispatch, useSelector } from 'react-redux';
// import { loadTasksTypes } from '../../store/actions/loadTasksTypes';

const CreateCoursePage = () => {
    // const dispatch = useDispatch();
    // const tasksTypes = useSelector(store => store.types);
    const courseTasks = useSelector(store => store.courseTasks);
    const [ title, setCourseName ] = useState('');
    const [ createCourseForms, setCreateCourseForms ] = useState([]); 

    const handleSubmit = async (e) => {
        console.log(JSON.stringify({
            title,
            credits: 0,
            tasks: courseTasks,
        }));
        fetch('https://heldy-api-pupi.azurewebsites.net/subjects', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                title,
                credits: 0,
                tasks: courseTasks,
            })
        })
    }
 
    const handleClick = e => {
        setCreateCourseForms([...createCourseForms, 1]);
    };

    useEffect(() => {
        // if(!tasksTypes) {
        //     dispatch(loadTasksTypes());
        // }
    }, []);

    return <div className={styles.pageWrapper}>
        <h3>Create course</h3>
        <div className={styles.courseName}>
            <input placeholder="Enter course name" onChange={(e) => setCourseName(e.target.value)}/>
        </div>
        { createCourseForms.map((el, i) => (<CourseForm key={i} index={i}></CourseForm>)) }
        <button onClick={handleClick}> Add task </button>
        <button onClick={handleSubmit}> Submit </button>
    </div>
};

export default CreateCoursePage;
