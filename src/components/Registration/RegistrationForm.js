import React, {useState} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import styles from './RegistrationForm.module.scss';


const RegistrationForm = () => {
    const passwordPattern = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?~_+-=|\]).{8,32}$";

    const [dob, setStartDate] = useState(new Date());
    const [name, SetName] = useState('');
    const [surname, setSurname] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassowrd, setRepeatPassword] = useState('');

    const handleDayChange = (selectedDay) => {
        setStartDate(selectedDay);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch('https://localhost:44369/account/registration', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                surname,
                secondName,
                dob,
                email,
                password,
            }),
        }).then(data => console.log(data))
    }

    return <>
        <form onSubmit={handleFormSubmit} className={styles.form}>
            <input type="text" required placeholder="Name" onChange={(e) => SetName(e.target.value)}/>
            <input type="text" required placeholder="Surname" onChange={(e) => setSurname(e.target.value)}/> 
            <input type="text" required placeholder="Second name" onChange={(e) => setSecondName(e.target.value)}/> 
            <DayPickerInput
                inputProps={{ style: { width: '300px' } }}
                onDayChange={handleDayChange}
                    dayPickerProps={{
                        month: new Date(),
                        showWeekNumbers: true,
                }}
            />
            <input type="email" required placeholder="Email" onChange={(e) => setEmail(e.target.value)}/> 
            <input type="password" required placeholder="Password" pattern={passwordPattern} onChange={(e) => setPassword(e.target.value) }/> 
            <input type="password" required placeholder="Repeat password" pattern={passwordPattern} onChange={e => setRepeatPassword(e.target.value)}/> 
            <input type="submit" value="Register"/>
        </form>
    </>;
}

export default RegistrationForm;
