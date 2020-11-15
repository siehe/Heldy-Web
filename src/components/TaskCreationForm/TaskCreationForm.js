import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { useDispatch } from 'react-redux';
import { loadUserList } from '../../store/actions/userList';
import { loadUserCategories } from '../../store/actions/userCategories';

import styles from './TaskCreationForm.module.scss';

const TaskCreationForm = ({handleClose}) => {
    const dispatch = useDispatch();

    const [statement, setStatement] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(new Date());

    const handleDayChange = (selectedDay) => {
        setDeadline(selectedDay);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://localhost:44369/tasks', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                deadline,
                statement,
                description,
                subjectId: 1,
                assigneeId: 2,
                authorId: 1,
                typeId: 1,
                statusId: 1,
            })
        }).then(() => {
            dispatch(loadUserCategories());
            dispatch(loadUserList(2));
            handleClose();
        })
    }

    return <div className={styles.container}>
        <div className={styles.formWrapper}>
            <button onClick={handleClose} className={styles.button}>X</button>
            <h4>Create task</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" required onChange={e => setStatement(e.target.value)} placeholder="Task name (Lab #5)"/>
                <DayPickerInput onDayChange={handleDayChange}
                        dayPickerProps={{
                            month: new Date(),
                            showWeekNumbers: true,
                    }}></DayPickerInput>
                <textarea type="textarea" placeholder="Description (optional)" onChange={e => setDescription(e.target.value)}/>
                <input type="submit"/>
            </form>
        </div>
    </div>;
}

export default TaskCreationForm;
