import React, { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import styles from './CourseForm.module.scss';

const CourseForm = () => {
    const [date, setStartDate] = useState(new Date());

    const handleDayChange = (selectedDay) => {
        setStartDate(selectedDay);
    }

    return <div className={styles.wrapper}>
        <form>
            <input type="text"/>
            <DayPickerInput
                inputProps={{ style: { width: '396px' } }}
                onDayChange={handleDayChange}
                    dayPickerProps={{
                        month: new Date(),
                        showWeekNumbers: true,
                }}
                placeholder="Enter deadline"
            />
            <input type="image" style={{pointerEvents: 'none'}}/>
            <input />
        </form>
    </div>
};

export default CourseForm;
