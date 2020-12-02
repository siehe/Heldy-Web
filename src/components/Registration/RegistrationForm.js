import React, {useState} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Redirect } from 'react-router-dom';

import styles from './RegistrationForm.module.scss';


const RegistrationForm = () => {
    const passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})";

    const [dob, setStartDate] = useState(new Date());
    const [name, SetName] = useState('');
    const [surname, setSurname] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassowrd, setRepeatPassword] = useState('');
    const [ isRedirect, setIsRedirect ] = useState(false);

    const handleDayChange = (selectedDay) => {
        setStartDate(selectedDay);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        fetch('https://heldy-api-pupi.azurewebsites.net/account/registration', {
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
        }).then(data => {
            if(data.ok) {
                setIsRedirect(!isRedirect);
            }
        })
    }

    return !isRedirect ? <div className={styles.container}>
        <h4>
            Sign up
        </h4>
        <form onSubmit={handleFormSubmit} className={styles.form}>
            <input type="text" required placeholder="Name" onChange={(e) => SetName(e.target.value)}/>
            <input type="text" required placeholder="Surname" onChange={(e) => setSurname(e.target.value)}/> 
            <input type="text" required placeholder="Second name" onChange={(e) => setSecondName(e.target.value)}/> 
            <DayPickerInput
                inputProps={{ style: { width: '396px' } }}
                onDayChange={handleDayChange}
                    dayPickerProps={{
                        month: new Date(),
                        showWeekNumbers: true,
                }}
            />
            <input type="email" required placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" onChange={(e) => setEmail(e.target.value)}/> 
            <input type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value) }/> 
            <input type="password" required placeholder="Repeat password" onChange={e => setRepeatPassword(e.target.value)}/> 
            <input type="submit" value="Register"/>
        </form>
    </div> : <Redirect to={{
        pathname: "/login"
    }}/>;
}

export default RegistrationForm;
