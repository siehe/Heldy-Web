import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { useDispatch, useSelector } from 'react-redux';
import { loadUserList } from '../../store/actions/userList';
import { loadUserCategories } from '../../store/actions/userCategories';

import styles from './EditTaskForm.module.scss';
import { editTask } from '../../store/actions/editTask';

const EditTaskForm = () => {
    const dispatch = useDispatch();
    const task = useSelector(store => store.editTask);
    const [statement, setStatement] = useState(task.statement);
    const [description, setDescription] = useState(task.description);
    const [deadline, setDeadline] = useState(new Date());

    const handleDayChange = (selectedDay) => {
        setDeadline(selectedDay);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        dispatch(editTask({
            isEditTaskShown: false,
            task,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://heldy-api-pupi.azurewebsites.net/tasks/' + task.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                id: task.id,
                deadline,
                statement,
                description,
                subjectId: task.subejct.id,
                assigneeId: task.assignee.id,
                authorId: task.author.id,
                typeId: task.type.id,
                statusId: task.status.id,
            }),
        }).then(() => {
            dispatch(loadUserCategories());
            dispatch(loadUserList(localStorage.getItem('userId')));
            dispatch(editTask({
                isEditTaskShown: false,
                task,
            }));
        })
    }

    return <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
            Edit Task
            <input type="text" required onChange={e => setStatement(e.target.value)} placeholder="Task name (Lab #5)" value={statement}/>
            <input type="textarea" placeholder="Description (optional)" value={description} onChange={e => setDescription(e.target.value)}/>
            <DayPickerInput onDayChange={handleDayChange}
                        dayPickerProps={{
                            month: new Date(task.deadline),
                            showWeekNumbers: true,
                    }}></DayPickerInput>
            <fieldset>
                <input type="submit" value="Edit"/>
                <input type="button" value="Cancel" onClick={handleCancel}/>
            </fieldset>
        </form>
    </div>
}

export default EditTaskForm;
