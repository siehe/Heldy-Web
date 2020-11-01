import React, {useState} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import './RegistrationForm.module.scss';


const RegistrationForm = () => {
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
        <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Name" onChange={(e) => SetName(e.target.value)}/>
            <input type="text" placeholder="Surname" onChange={(e) => setSurname(e.target.value)}/> 
            <input type="text" placeholder="Second name" onChange={(e) => setSecondName(e.target.value)}/> 
            <DayPickerInput
                inputProps={{ style: { width: '300px' } }}
                onDayChange={handleDayChange}
                    dayPickerProps={{
                        month: new Date(2018, 10),
                        showWeekNumbers: true,
                }}
            />
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/> 
            <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value) }/> 
            <input type="text" placeholder="Repeat password" onChange={e => setRepeatPassword(e.target.value)}/> 
            <input type="submit"/>
        </form>
    </>;
}

export default RegistrationForm;
