import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Icon } from 'semantic-ui-react';

import styles from './CourseForm.module.scss';

const CourseForm = ({index}) => {
    const [ taskName, setTaskName ] = useState('');
    const [ date, setStartDate ] = useState(new Date());

    const handleDayChange = (selectedDay) => {
        setStartDate(selectedDay);
    };
    
    const handleSubmit = e => {
        e.preventDefault();
    };

    const handleTaskNameInput = e => {
        setTaskName(e.target.value);
    };

    return <div className={styles.wrapper}>
        {index + 1}
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter task name" onChange={handleTaskNameInput}/>
            <DayPickerInput
                inputProps={{ style: { width: '396px' } }}
                onDayChange={handleDayChange}
                    dayPickerProps={{
                        month: new Date(),
                        showWeekNumbers: true,
                }}
                placeholder="Enter deadline"
            />
            <div>
                <Icon name="upload"></Icon>
                Materials
            </div>
            <input type="submit" value="SUBMIT"/>
        </form>
        <button>-</button>
    </div>
};

export default CourseForm;
