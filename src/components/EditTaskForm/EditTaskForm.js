import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { useDispatch } from 'react-redux';
import { loadUserList } from '../../store/actions/userList';
import { loadUserCategories } from '../../store/actions/userCategories';

const EditTaskForm = (task) => {
    console.log(task);
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
                authorId: localStorage.getItem('userId'),
                typeId: 1,
                statusId: 1,
            })
        }).then(() => {
            dispatch(loadUserCategories());
            dispatch(loadUserList(localStorage.getItem('userId')));
        })
    }

    return <div>
        <form onSubmit={handleSubmit}>
            Edit Task
            <input type="text" required onChange={e => setStatement(e.target.value)} placeholder="Task name (Lab #5)" value={''}/>
            <input type="textarea" placeholder="Description (optional)" value={''} onChange={e => setDescription(e.target.value)}/>
            <DayPickerInput onDayChange={handleDayChange}
                        dayPickerProps={{
                            month: new Date(),
                            showWeekNumbers: true,
                    }}></DayPickerInput>
        </form>
    </div>
}

export default EditTaskForm;
