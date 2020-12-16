import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { useDispatch } from 'react-redux';
import { loadUserList } from '../../store/actions/userList';
import { loadUserCategories } from '../../store/actions/userCategories';
import { colomns } from '../../constants/tasks';

import styles from './TaskCreationForm.module.scss';

const TaskCreationForm = ({handleClose}) => {
    const dispatch = useDispatch();

    const [statement, setStatement] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [statusId, setStatusId ] = useState(1);

    const handleDayChange = (selectedDay) => {
        setDeadline(selectedDay);
    }

    const handleStatusChange = e => {
        setStatusId(Number(e.target.value));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://heldy-api-pupi.azurewebsites.net/tasks', {
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
                assigneeId: Number(localStorage.getItem('userId')),
                authorId: Number(localStorage.getItem('userId')),
                typeId: 1,
                statusId,
            })
        }).then(() => {
            dispatch(loadUserCategories());
            dispatch(loadUserList(localStorage.getItem('userId')));
            handleClose();
        })
    }

    return <div className={styles.container}>
        <div className={styles.formWrapper}>
            <button onClick={handleClose} className={styles.button}>X</button>
            <h4>Create task</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" required onChange={e => setStatement(e.target.value)} placeholder="Task name (Lab #5)"/>
                <div className={styles.dropdown}>
                    <span>Status:</span>
                    <select onChange={handleStatusChange}>
                        {colomns.map(({id, name}) => {
                            return <option value={id}>{name}</option>
                        })}
                    </select>
                </div>
                <DayPickerInput onDayChange={handleDayChange}
                        dayPickerProps={{
                            month: new Date(),
                            showWeekNumbers: true,
                            disabledDays: {before: new Date()}
                    }}></DayPickerInput>
                <textarea type="textarea" placeholder="Description (optional)" onChange={e => setDescription(e.target.value)}/>
                <input type="submit"/>
            </form>
        </div>
    </div>;
}

export default TaskCreationForm;
